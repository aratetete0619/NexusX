import pytest
from app.utils.auth import (
    generate_auth_token,
    generate_confirmation_code,
    check_password_strength,
    hash_password,
    verify_password,
)


def test_generate_confirmation_code():
    confirmation_code = generate_confirmation_code()
    assert isinstance(confirmation_code, str)
    assert len(confirmation_code) == 36


def test_check_password_strength():
    weak_password = "12345"
    strong_password = "StrongPassword123!"
    assert check_password_strength(weak_password) == False
    assert check_password_strength(strong_password) == True


def test_generate_auth_token():
    user_id = 1
    secret_key = "0f5a2d8d9a0e8b9e92d89761e52844b99f8a35ed4982b3a4d2b73003113341c3"
    token = generate_auth_token(user_id, secret_key)

    assert isinstance(token, str)  # The token should be a string
    parts = token.split(".")
    assert (
        len(parts) == 3
    )  # The token should have exactly two dots, separating it into three parts


def test_hash_password():
    password = "StrongPassword123!"
    hashed_password = hash_password(password)
    assert hashed_password is not None
    assert hashed_password != password


def test_verify_password():
    password = "StrongPassword123!"
    hashed_password = hash_password(password)
    assert verify_password(password, hashed_password)


def test_check_password_strength():
    assert not check_password_strength("weakpassword")
    assert check_password_strength("StrongPassword123!")
