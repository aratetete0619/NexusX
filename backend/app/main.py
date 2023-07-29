from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette_graphene3 import GraphQLApp
from ..db.database import engine, SessionLocal

from .graphql.schema import schema  # schema.pyからschemaをインポート

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_route("/graphql", GraphQLApp(schema=schema))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
