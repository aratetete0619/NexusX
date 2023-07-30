# schema.py

from graphene import ObjectType, String, Field, List, Schema, Mutation
from .resolvers import resolve_search, resolve_create_user
from .types import Result


class Query(ObjectType):
    search = Field(List(Result), query=String(required=True))

    # リゾルバーは外部モジュールからインポートします
    resolve_search = resolve_search


class CreateUserOutput(ObjectType):
    id = String()
    email = String()


class CreateUser(Mutation):
    class Arguments:
        email = String(required=True)
        password = String(required=True)

    Output = CreateUserOutput

    def mutate(root, info, email, password):
        return resolve_create_user(email, password)


class Mutation(ObjectType):
    create_user = CreateUser.Field()


schema = Schema(query=Query, mutation=Mutation)
