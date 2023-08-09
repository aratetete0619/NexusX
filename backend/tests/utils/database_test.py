# tests/utils/database_test.py
from unittest.mock import MagicMock
from app.utils.database import create_user, get_user_by_email


def test_create_user(mocker):
    mock_connection = mocker.Mock()
    mock_cursor = mocker.Mock()
    mock_connection.cursor.return_value = mock_cursor
    create_user(mock_connection, "test@example.com", "hashedpassword", "123456")
    mock_cursor.execute.assert_called_once()


# def test_get_user_by_email(mocker):
#     mock_connection = mocker.Mock()
#     mock_cursor = MagicMock()
#     mock_connection.cursor.return_value = mock_cursor
#     mock_cursor.fetchone.return_value = (
#         "123",
#         "test@example.com",
#         "hashedpassword",
#         "123456",
#         False,
#     )

#     user = get_user_by_email(mock_connection, "test@example.com")

#     mock_cursor.execute.assert_called_with(
#         "SELECT * FROM users WHERE email = %s", ("test@example.com",)
#     )
#     assert user == ("123", "test@example.com", "hashedpassword", "123456", False)
