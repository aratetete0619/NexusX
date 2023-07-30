from fastapi import FastAPI, HTTPException
from fastapi.responses import PlainTextResponse, JSONResponse
from starlette.middleware.cors import CORSMiddleware
from starlette_graphene3 import GraphQLApp
from .graphql.schema import schema


class UserAlreadyExistsError(Exception):
    def __init__(self, message="User already exists"):
        self.message = message
        super().__init__(self.message)


class InvalidPasswordError(Exception):
    def __init__(self, message="Invalid password"):
        self.message = message
        super().__init__(self.message)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
