# app/utils/database.py

import mysql.connector
from mysql.connector import Error
import os
from datetime import timedelta
import datetime
from ..utils.neo4j_utils import get_node_info_from_neo4j


# カスタム例外クラスを定義
class UserAlreadyExistsError(Exception):
    def __init__(self, email):
        self.email = email
        self.message = f"User with email {email} already exists."


class InvalidPasswordError(Exception):
    def __init__(self, password):
        self.password = password
        self.message = "Invalid password. It does not meet the requirements."


def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            passwd=os.getenv("DB_PASS"),
            database="nexusx",
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")

    return connection


def close_connection(connection):
    if connection.is_connected():
        connection.close()
        print("MySQL connection is closed")


def create_user(connection, email, password_hash, confirmed=False):
    cursor = connection.cursor()
    existing_user = get_user_by_email(connection, email)
    if existing_user is not None:
        raise UserAlreadyExistsError(email)
    try:
        # 現在の日時を取得
        current_timestamp = datetime.datetime.now()

        cursor.execute(
            """
            INSERT INTO Users (email, password_hash, confirmed, confirmation_code_created_at)
            VALUES (%s, %s, %s, %s)
            """,
            (email, password_hash, confirmed, current_timestamp),
        )
        connection.commit()
        user_id = cursor.lastrowid
        print(f"User created with ID: {user_id}")
        return user_id
    except Exception as e:
        print(f"Failed to insert user: {e}")
        connection.rollback()
    finally:
        cursor.close()


def get_user_by_email(connection, email, as_dict=False):
    cursor = connection.cursor(dictionary=as_dict)
    sql = "SELECT * FROM users WHERE email = %s"
    cursor.execute(sql, (email,))
    result = cursor.fetchone()
    cursor.close()
    return result


def save_confirmation_code_to_db(connection, user_id, confirmation_code):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "UPDATE Users SET confirmation_code=%s WHERE user_id=%s",
            (confirmation_code, user_id),
        )
        connection.commit()
        print(f"Confirmation code {confirmation_code} saved for user ID {user_id}")
    except Exception as e:
        print(f"Failed to update user confirmation code: {e}")
        connection.rollback()
    finally:
        cursor.close()


def get_user_by_confirmation_code(connection, confirmation_code):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT * FROM Users WHERE confirmation_code=%s",
            (confirmation_code,),
        )
        user = cursor.fetchone()
        return user
    except Exception as e:
        print(f"Failed to get user by confirmation code: {e}")
    finally:
        cursor.close()


def get_confirmation_code_expiry(connection, user_id):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT confirmation_code_timestamp FROM Users WHERE id=%s",
            (user_id,),
        )
        timestamp = cursor.fetchone()
        # Add 1 day to the timestamp to get the expiry date
        expiry = timestamp + timedelta(days=1)
        return expiry
    except Exception as e:
        print(f"Failed to get confirmation code expiry: {e}")
    finally:
        cursor.close()


def update_user_confirmation_status(connection, user_id):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "UPDATE Users SET confirmed=True WHERE user_id=%s",
            (user_id,),
        )
        connection.commit()
    except Exception as e:
        print(f"Failed to update user confirmation status: {e}")
        connection.rollback()
    finally:
        cursor.close()


def delete_confirmation_code(connection, user_id):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "UPDATE Users SET confirmation_code=NULL WHERE user_id=%s",
            (user_id,),
        )
        connection.commit()
    except Exception as e:
        print(f"Failed to delete confirmation code: {e}")
        connection.rollback()
    finally:
        cursor.close()


def save_user_page_to_db(connection, user_id, page_id):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO UserPages (user_id, page_id) VALUES (%s, %s)",
            (user_id, page_id),
        )
        connection.commit()
        print(f"User page saved for user ID {user_id} and page ID {page_id}")
    except Exception as e:
        print(f"Failed to save user page: {e}")
        connection.rollback()
    finally:
        cursor.close()


def delete_user_page_from_db(connection, user_id, page_id):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "DELETE FROM UserPages WHERE user_id=%s AND page_id=%s",
            (user_id, page_id),
        )
        connection.commit()
        print(f"User page deleted for user ID {user_id} and page ID {page_id}")
    except Exception as e:
        print(f"Failed to delete user page: {e}")
        connection.rollback()
    finally:
        cursor.close()


def save_node_media_to_db(connection, node_id, media_type, media_path):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO NodeMedia (node_id, media_type, media_path) VALUES (%s, %s, %s)",
            (node_id, media_type, media_path),
        )
        connection.commit()
        media_id = cursor.lastrowid
        print(f"Node media data saved with media_id: {media_id}")
        return media_id
    except Exception as e:
        print(f"Failed to save node media data: {e}")
        connection.rollback()
    finally:
        cursor.close()


def save_page_node_to_db(connection, user_page_id, media_id):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO PageNodes (user_page_id, media_id) VALUES (%s, %s)",
            (user_page_id, media_id),
        )
        connection.commit()
        print(
            f"Page node data saved for user_page_id {user_page_id} and media_id {media_id}"
        )
    except Exception as e:
        print(f"Failed to save page node data: {e}")
        connection.rollback()
    finally:
        cursor.close()


def get_user_page_by_page_id(connection, page_id):
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT * FROM UserPages WHERE page_id=%s",
            (page_id,),
        )
        user_page = cursor.fetchone()
        return user_page
    except Exception as e:
        print(f"Failed to get user page by page_id: {e}")
    finally:
        cursor.close()


def delete_node_from_db(node_id):
    connection = create_connection()
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM NodeMedia WHERE node_id = %s", (node_id,))
        connection.commit()
        return True
    except Exception as e:
        print(f"Failed to delete node: {str(e)}")
        return False
    finally:
        close_connection(connection)


def get_nodes_by_page_uuid(connection, page_uuid):
    cursor = connection.cursor(dictionary=True)
    try:
        # UserPagesテーブルからuser_page_idを取得
        cursor.execute(
            "SELECT user_page_id FROM UserPages WHERE page_id=%s", (page_uuid,)
        )
        user_page = cursor.fetchone()
        user_page_id = user_page["user_page_id"]

        # PageNodesテーブルからmedia_idを取得
        cursor.execute(
            "SELECT media_id FROM PageNodes WHERE user_page_id=%s", (user_page_id,)
        )
        media_ids = [item["media_id"] for item in cursor.fetchall()]

        nodes = []
        for media_id in media_ids:
            # NodeMediaテーブルからnode_idを取得
            cursor.execute(
                "SELECT node_id FROM NodeMedia WHERE media_id=%s", (media_id,)
            )
            result = cursor.fetchone()  # 追加
            print(result)  # 追加: 結果をプリントして確認
            node_id = result["node_id"]

            # Neo4jからnodeの情報を取得
            node_info = get_node_info_from_neo4j(node_id)
            node_info["node_id"] = node_id
            nodes.append(node_info)

        return nodes
    except Exception as e:
        print(f"Failed to get nodes by page UUID: {e}")
    finally:
        cursor.close()
