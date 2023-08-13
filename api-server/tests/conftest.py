# tests/conftest.py
import pytest
from app.utils.database import create_connection, create_user


@pytest.fixture
def user_in_db():
    connection = create_connection()
    email = "test@example.com"
    password_hash = "hashedpassword"
    confirmation_code = "123456"
    create_user(connection, email, password_hash, confirmation_code)
    yield
    # Here you would add any cleanup logic if necessary
    # For example, you might want to delete the user that was created.
