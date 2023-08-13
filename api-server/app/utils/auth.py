# app/utils/auth.py

import re
from fastapi import HTTPException
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
import uuid
import logging
import redis

logging.basicConfig(level=logging.INFO)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def check_password_strength(password: str):
    """
    Check the strength of `password`
    Returns False if the password doesn't meet the policy requirement
    """
    length_error = len(password) < 8
    digit_error = re.search(r"\d", password) is None
    uppercase_error = re.search(r"[A-Z]", password) is None
    lowercase_error = re.search(r"[a-z]", password) is None
    symbol_error = re.search(r"\W", password) is None
    password_ok = not (
        length_error
        or digit_error
        or uppercase_error
        or lowercase_error
        or symbol_error
    )
    return password_ok


def generate_auth_token(user_id, secret_key):
    logging.info("generate_auth_token called")
    payload = {
        "user_id": user_id,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(days=1),
    }
    return jwt.encode(payload, secret_key, algorithm="HS256")


def verify_auth_token(token, secret_key):
    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.PyJWTError:
        return None


def generate_confirmation_code():
    confirmation_code = uuid.uuid4().hex
    return confirmation_code


r = redis.Redis(host="localhost", port=6379, db=0)


def track_account_creation(ip_address):
    current_time = datetime.now().timestamp()
    r.lpush(ip_address, current_time)
    # Only keep account creations in the last hour
    one_hour_ago = (datetime.now() - timedelta(hours=1)).timestamp()
    r.ltrim(ip_address, 0, int(one_hour_ago))
    if len(r.lrange(ip_address, 0, -1)) > 5:
        raise Exception(
            "Too many account creations from this IP address. Please try again later."
        )
