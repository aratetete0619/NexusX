from fastapi import FastAPI, HTTPException
from fastapi.responses import PlainTextResponse, JSONResponse, RedirectResponse
from starlette.middleware.cors import CORSMiddleware
from starlette_graphene3 import GraphQLApp
from .graphql.schema import schema
from logging_config import LOGGING_CONFIG
from starlette.middleware.base import BaseHTTPMiddleware
import jwt
import os
from dotenv import load_dotenv
from logging_config import LOGGING_CONFIG
from .graphql.resolvers import resolve_confirm_user
from apscheduler.schedulers.background import BackgroundScheduler
from utils.database import create_connection, close_connection


load_dotenv()


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        auth_header = request.headers.get("Authorization")

        if auth_header:
            try:
                token = auth_header.split(" ")[1]
                jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
            except (IndexError, jwt.DecodeError, jwt.ExpiredSignatureError):
                return JSONResponse(
                    status_code=401,
                    content={"message": "Invalid or expired token"},
                )

        response = await call_next(request)
        return response


class UserAlreadyExistsError(Exception):
    def __init__(self, message="User already exists"):
        self.message = message
        super().__init__(self.message)


class InvalidPasswordError(Exception):
    def __init__(self, message="Invalid password"):
        self.message = message
        super().__init__(self.message)


def delete_unconfirmed_users():
    # Create a new connection for the job
    conn = create_connection()

    # Your job code here

    # Close the connection when the job is done
    close_connection(conn)


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(delete_unconfirmed_users, "interval", hours=24)
    scheduler.start()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(AuthMiddleware)

app.add_route("/graphql", GraphQLApp(schema=schema))


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request, exc):
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)


@app.exception_handler(UserAlreadyExistsError)
async def handle_user_already_exists(error: UserAlreadyExistsError):
    return JSONResponse(
        status_code=400,
        content={"message": error.message},
    )


@app.exception_handler(InvalidPasswordError)
async def handle_invalid_password(error: InvalidPasswordError):
    return JSONResponse(
        status_code=400,
        content={"message": error.message},
    )


@app.get("/confirm/{confirmation_code}")
async def confirm(confirmation_code: str):
    result = resolve_confirm_user(confirmation_code)
    if result["success"]:
        # if the confirmation was successful, redirect to the login page
        return RedirectResponse(url="/login", status_code=303)
    else:
        # else, return a plain text response with the error message
        return PlainTextResponse(result["message"], status_code=400)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_config=LOGGING_CONFIG)
