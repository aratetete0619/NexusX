# resolvers.py

from ..utils.search_utils import (
    search_in_elasticsearch,
    preprocess_query,
    get_related_nodes_from_neo4j,
)
from ..utils.database import (
    create_connection,
    create_user,
    get_user_by_email,
    save_confirmation_code_to_db,
    get_user_by_confirmation_code,
    update_user_confirmation_status,
    delete_confirmation_code,
)
from ..utils.favorite_utils import add_favorite, remove_favorite, get_favorites
from .types import (
    Result,
    Relationship,
    Node,
    NodeProperties,
    RelationshipProperties,
    RelatedNode,
)
from ..utils.auth import (
    hash_password,
    check_password_strength,
    verify_password,
    generate_auth_token,
    generate_confirmation_code,
    verify_google_token,
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
            user_id = user[0]
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
