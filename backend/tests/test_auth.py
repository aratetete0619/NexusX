from app.utils.auth import generate_auth_token


def test_generate_auth_token():
    user_id = "test_user_id"
    secret_key = "test_secret_key"
    token = generate_auth_token(user_id, secret_key)
    assert token is not None, "Token generation failed"
