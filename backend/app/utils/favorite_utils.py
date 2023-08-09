from .database import create_connection


def get_user_id(email):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT user_id FROM Users WHERE email = ?", (email,))
    result = cursor.fetchone()
    cursor.close()
    return result[0] if result else None


def get_node_id(esId):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT node_id FROM NodeMedia WHERE media_id = ?", (esId,))
    result = cursor.fetchone()
    cursor.close()
    return result[0] if result else None


def add_favorite(email, esId):
    user_id = get_user_id(email)
    node_id = get_node_id(esId)
    if user_id is None or node_id is None:
        return None
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO UserFavorites (user_id, node_id) VALUES (?, ?)", (user_id, node_id)
    )
    connection.commit()
    cursor.close()


def remove_favorite(email, esId):
    user_id = get_user_id(email)
    node_id = get_node_id(esId)
    if user_id is None or node_id is None:
        return None
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute(
        "DELETE FROM UserFavorites WHERE user_id = ? AND node_id = ?",
        (user_id, node_id),
    )
    connection.commit()
    cursor.close()


def get_favorites(email):
    user_id = get_user_id(email)
    if user_id is None:
        return []
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT node_id FROM UserFavorites WHERE user_id = ?", (user_id,))
    results = cursor.fetchall()
    cursor.close()
    return [result[0] for result in results]
