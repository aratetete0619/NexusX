# resolvers.py

from ..utils.search_utils import (
    search_in_elasticsearch,
    preprocess_query,
    get_related_nodes_from_neo4j,
)
from ..utils.database import (
    create_connection,
    close_connection,
    create_user,
    get_user_by_email,
    save_confirmation_code_to_db,
    get_user_by_confirmation_code,
    update_user_confirmation_status,
    delete_confirmation_code,
    save_user_page_to_db,
    delete_user_page_from_db,
    save_node_media_to_db,
    save_page_node_to_db,
    get_user_page_by_page_id,
    delete_node_from_db,
    get_nodes_by_page_uuid,
)
from ..utils.favorite_utils import add_favorite, remove_favorite, get_favorites
from .types import (
    Result,
    Relationship,
    Node,
    NodeProperties,
    RelationshipProperties,
    RelatedNode,
    DeleteNodeResponse,
)
from ..utils.auth import (
    hash_password,
    check_password_strength,
    verify_password,
    generate_auth_token,
    generate_confirmation_code,
    verify_google_token,
)
from ..utils.neo4j_utils import (
    save_node_to_neo4j,
    get_node_info_from_neo4j,
    update_node_position_in_neo4j,
    delete_node_from_neo4j,
)

import os
from ..utils.email import send_confirmation_email
import logging
from graphql import GraphQLError
from datetime import datetime
from datetime import datetime, timedelta


def resolve_search(root, info, query):
    try:
        preprocessed_query = preprocess_query(query)
        combined_results = search_in_elasticsearch(preprocessed_query)
        if isinstance(combined_results, dict) and "error" in combined_results:
            raise GraphQLError("An error occurred while searching the data.")
        return [
            Result(
                originalQuery=query,
                preprocessedQuery=preprocessed_query,
                startNode=result,
            )
            for result in combined_results
        ]
    except Exception as e:
        raise GraphQLError("An error occurred while resolving the search.")


def resolve_create_user(email, password):
    if not check_password_strength(password):
        raise GraphQLError("Password strength is not sufficient")

    connection = create_connection()

    password_hash = hash_password(password)

    try:
        user_id = create_user(connection, email, password_hash, confirmed=False)
        if user_id is None:
            raise GraphQLError("Failed to create user. Please try again.")
        else:
            logging.info(f"User created with ID: {user_id}")
    except ValueError:
        raise GraphQLError("User already exists")

    confirmation_code = generate_confirmation_code()

    try:
        # Save the confirmation code for the user to the database
        save_confirmation_code_to_db(connection, user_id, confirmation_code)
        logging.info(
            f"Confirmation code {confirmation_code} saved for user ID {user_id}"
        )
    except Exception as e:
        logging.error(f"Failed to save confirmation code: {str(e)}")
        raise GraphQLError(f"Failed to save confirmation code: {str(e)}")

    try:
        # Send a confirmation email to the new user
        send_confirmation_email(email, confirmation_code)
        logging.info(f"Confirmation email sent to {email}")
    except Exception as e:
        logging.error(f"Failed to send confirmation email: {str(e)}")
        raise GraphQLError(f"Failed to send confirmation email: {str(e)}")

    confirmation_url = f"http://localhost:3000/confirm-account?code={confirmation_code}"

    return {
        "id": user_id,
        "email": email,
        "message": "Confirmation email has been sent. Please check your inbox and confirm your email address.",
        "confirmationUrl": confirmation_url,
    }


def resolve_confirm_user(confirmation_code: str):
    connection = create_connection()

    user = get_user_by_confirmation_code(connection, confirmation_code)
    if user is None:
        raise GraphQLError(
            "The confirmation code you provided is invalid or has already been used. Please check the code and try again."
        )

    confirmation_code_created_at = user[7]

    if datetime.now() - confirmation_code_created_at > timedelta(hours=24):
        raise GraphQLError(
            "The confirmation code has expired. Please request a new one."
        )

    try:
        # Update the user's confirmation status in the database
        update_user_confirmation_status(connection, user[0])
        delete_confirmation_code(connection, user[0])
    except Exception as e:
        raise GraphQLError(f"Failed to confirm user: {str(e)}")
    finally:
        connection.close()

    return {"message": "User confirmed successfully", "success": True}


def resolve_login_user(email: str, password: str):
    connection = create_connection()
    user = get_user_by_email(connection, email)
    connection.close()

    if user is None:
        logging.error("User not found")
        raise GraphQLError("Invalid username or password")

    if not verify_password(password, user[3]):
        logging.error("Incorrect password")
        raise GraphQLError("Invalid username or password")

    secret_key = os.getenv("JWT_SECRET")
    logging.info(f"Secret Key: {secret_key}")
    token = generate_auth_token(user[0], secret_key)

    if not token:
        logging.error("Token generation failed")
        raise GraphQLError("Token generation failed")

    logging.info(f"Generated Token: {token}")

    response = {
        "id": user[0],
        "email": user[2],
        "token": token,
    }

    return response


def resolve_google_login(google_token: str):
    google_user_info = verify_google_token(google_token)

    connection = create_connection()
    user = get_user_by_email(connection, google_user_info["email"])

    if user is None:
        user = create_user(connection, google_user_info["email"])

    connection.close()

    secret_key = os.getenv("JWT_SECRET")
    token = generate_auth_token(user[0], secret_key)

    response = {
        "id": user[0],
        "email": user[2],
        "token": token,
    }

    return response


def resolve_get_related_nodes(root, info, es_id):
    try:
        related_nodes_data = get_related_nodes_from_neo4j(es_id)
        if isinstance(related_nodes_data, dict) and "error" in related_nodes_data:
            raise GraphQLError("An error occurred while searching the data.")
        if related_nodes_data is None or not related_nodes_data:
            raise GraphQLError("No related nodes found for the given es_id.")

        return [
            RelatedNode(
                originalQuery=None,  # Update this if you have the data
                preprocessedQuery=None,  # Update this if you have the data
                startNode=Node(
                    identity=related_node.get("start_node", {}).get("identity"),
                    labels=related_node.get("start_node", {}).get("labels"),
                    properties=NodeProperties(
                        **related_node.get("start_node", {}).get("properties", {})
                    ),
                ),
                relationship=Relationship(
                    identity=related_node.get("relationship", {}).get("identity"),
                    type=related_node.get("relationship", {}).get("type"),
                    properties=RelationshipProperties(
                        **related_node.get("relationship", {}).get("properties", {})
                    ),
                ),
                endNode=Node(
                    identity=related_node.get("end_node", {}).get("identity"),
                    labels=related_node.get("end_node", {}).get("labels"),
                    properties=NodeProperties(
                        **related_node.get("end_node", {}).get("properties", {})
                    ),
                ),
                score="1",
            )
            for related_node in related_nodes_data
        ]
    except Exception as e:
        raise GraphQLError("An error occurred while resolving the related nodes.")


def resolve_add_favorite(email: str, nodeId: str):
    try:
        add_favorite(email, nodeId)
        return {"message": "Favorite added successfully", "success": True}
    except Exception as e:
        raise GraphQLError(f"Failed to add favorite: {str(e)}")


def resolve_remove_favorite(email: str, nodeId: str):
    try:
        remove_favorite(email, nodeId)
        return {"message": "Favorite removed successfully", "success": True}
    except Exception as e:
        raise GraphQLError(f"Failed to remove favorite: {str(e)}")


def resolve_get_favorites(email: str):
    try:
        favorite_nodes = get_favorites(email)
        return [Favorite(email=email, nodeId=nodeId) for nodeId in favorite_nodes]
    except Exception as e:
        raise GraphQLError(f"Failed to get favorites: {str(e)}")


def resolve_google_login(tokenId: str):
    google_user_info = verify_google_token(tokenId)

    if not google_user_info:
        raise GraphQLError("Invalid or expired Google token.")

    email = google_user_info["email"]
    username_from_google = google_user_info.get("name")

    try:
        connection = create_connection()
        user = get_user_by_email(connection, email)

        if user is None:
            dummy_password_hash = hash_password("google_authenticated")
            user = create_user(
                connection,
                email,
                dummy_password_hash,
                confirmed=True,
                username=username_from_google,
            )

        connection.close()

    except Exception as e:
        raise GraphQLError(f"Database error: {str(e)}")

    if not user:
        raise GraphQLError("Failed to authenticate with Google.")

    secret_key = os.getenv("JWT_SECRET")
    if not secret_key:
        raise GraphQLError("Server configuration error.")

    token = generate_auth_token(user[0], secret_key)

    if not token:
        raise GraphQLError("Failed to generate authentication token.")

    response = {
        "id": str(user[0]),
        "email": user[2],
        "token": token,
        "message": "Successfully authenticated with Google.",
    }

    return response


def resolve_save_user_page(email, page_id):
    connection = create_connection()
    try:
        user = get_user_by_email(connection, email, as_dict=True)
        if user is None:
            raise GraphQLError(f"No user found with email: {email}")

        # userオブジェクトからuser_idを取得
        user_id = user["user_id"]
        save_user_page_to_db(connection, user_id, page_id)
        return {
            "page_id": page_id,
            "user_id": user_id,
            "created_at": datetime.now().isoformat(),
        }
    except Exception as e:
        raise GraphQLError(f"Failed to save user page: {str(e)}")
    finally:
        close_connection(connection)


def resolve_delete_user_page(root, info, email, page_id):
    connection = create_connection()
    try:
        user = get_user_by_email(connection, email, as_dict=True)
        if user is None:
            raise GraphQLError(f"No user found with email: {email}")

        user_id = user["user_id"]
        delete_user_page_from_db(connection, user_id, page_id)
        return {"success": True, "message": "User page deleted successfully"}
    except Exception as e:
        raise GraphQLError(f"Failed to delete user page: {str(e)}")
    finally:
        close_connection(connection)


def resolve_save_page_data(root, info, email, pageId, data):
    connection = create_connection()
    try:
        user_page = get_user_page_by_page_id(connection, pageId)
        if user_page is None:
            logging.error(f"No user page found with pageId: {pageId}")
            raise GraphQLError(f"No user page found with pageId: {pageId}")

        user_page_id = user_page["user_page_id"]

        for node in data["nodes"]:
            logging.debug(f"Saving node to Neo4j: {node}")
            neo4j_node_id = save_node_to_neo4j(node)
            if neo4j_node_id is None:
                logging.error(f"Failed to save node to Neo4j: {node}")
                continue  # Decide how you want to handle this case

            media_type = None
            media_path = None
            logging.debug(f"Saving media to DB: {neo4j_node_id}")
            media_id = save_node_media_to_db(
                connection, neo4j_node_id, media_type, media_path
            )
            if media_id is None:
                logging.error(f"Failed to save media to DB: {neo4j_node_id}")
                continue  # Decide how you want to handle this case

            logging.debug(f"Saving page node to DB: {user_page_id}, {media_id}")
            save_page_node_to_db(connection, user_page_id, media_id)

        return {"success": True, "message": "Page data saved successfully"}
    except Exception as e:
        logging.error(f"Exception occurred: {str(e)}")
        raise GraphQLError(f"Failed to save page data: {str(e)}")
    finally:
        close_connection(connection)


def resolve_delete_node(info, nodeId):
    success_mysql = delete_node_from_db(nodeId)

    success_neo4j = delete_node_from_neo4j(nodeId)

    if not success_mysql or not success_neo4j:
        raise GraphQLError("Failed to delete node from either MySQL or Neo4j.")
    return DeleteNodeResponse(success=True, message="Node deleted successfully")


def resolve_get_nodes_by_page_id(obj, info, pageId):
    # データベース接続を作成する
    connection = create_connection()

    try:
        # 1. MySQLから関連するノードの情報を取得
        node_media_info = get_nodes_by_page_uuid(connection, pageId)  # 修正した部分

        # 2. neo4jから詳細情報を取得
        complete_node_info = []
        for media in node_media_info:
            node_id = media.get("node_id")
            if not node_id:
                print(f"No node_id found for media: {media}")
                continue

            node_info = get_node_info_from_neo4j(node_id)

            if node_info is None:  # 追加
                continue

            combined_info = {**media, **node_info}
            complete_node_info.append(combined_info)

        return complete_node_info

    finally:
        # データベース接続を閉じる
        close_connection(connection)


def resolve_update_node_position(info, nodeId, x, y):
    """
    Update the position of a node.
    """
    success = update_node_position_in_neo4j(nodeId, x, y)
    if not success:
        raise GraphQLError("Failed to update node position.")
    return {"success": True, "message": "Node position updated successfully"}
