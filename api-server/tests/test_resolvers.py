import pytest
from app.graphql.resolvers import (
    resolve_create_user,
    resolve_confirm_user,
)
from app.utils.database import (
    get_user_by_confirmation_code,
    update_user_confirmation_status,
)
from app.utils.auth import (
    hash_password,
)


def test_create_user_success(mocker):
    email = "test@example.com"
    password = "StrongPassword123!"
    user_id = "123"
    mocker.patch(
        "app.utils.database.create_user", return_value=None
    )  # create_user does not return anything
    yagmail_smtp_mock = mocker.patch("yagmail.SMTP", autospec=True)
    yagmail_smtp_mock.return_value.login.return_value = None
    result = resolve_create_user(email, password)
    assert result["email"] == email


# def test_confirm_user_success(mocker):
#     confirmation_code = "123456"
#     user_id = "123"
#     user = [user_id, "test@example.com", "hashedpassword", confirmation_code, False]

#     mock_get_user_by_confirmation_code = mocker.patch(
#         "app.utils.database.get_user_by_confirmation_code",
#         return_value=user,
#     )

#     mock_update_user_confirmation_status = mocker.patch(
#         "app.utils.database.update_user_confirmation_status", return_value=None
#     )

#     yagmail_smtp_mock = mocker.patch("yagmail.SMTP", autospec=True)
#     yagmail_smtp_mock.return_value.login.return_value = None

#     result = resolve_confirm_user(confirmation_code)

#     mock_get_user_by_confirmation_code.assert_called_once_with(
#         mocker.ANY, confirmation_code
#     )
#     mock_update_user_confirmation_status.assert_called_once_with(mocker.ANY, user_id)

#     assert result == {"message": "User confirmed successfully"}
