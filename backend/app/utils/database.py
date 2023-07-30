# app/utils/database.py
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os


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


def create_user(connection, email, password_hash):
    cursor = connection.cursor()
    try:
        cursor.execute(
            f"INSERT INTO Users(username, email, password_hash) VALUES (NULL, '{email}', '{password_hash}')"
        )
        connection.commit()
        return cursor.lastrowid
    except mysql.connector.IntegrityError:  # 重複するemailに対してはUserAlreadyExistsErrorを発生させる
        raise UserAlreadyExistsError(email)
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        connection.rollback()  # Rollback the transaction if anything goes wrong
    finally:
        cursor.close()
