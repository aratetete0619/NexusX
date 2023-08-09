from graphene import ObjectType, String, Field, List, Schema, Mutation
from .resolvers import (
    resolve_search,
    resolve_create_user,
    resolve_login_user,
    resolve_confirm_user,
    resolve_get_related_nodes,
    resolve_add_favorite,
    resolve_remove_favorite,
    resolve_get_favorites,
)
from .types import Result, User, CreateUserOutput, RelatedNode, Favorite
import graphene


class Query(ObjectType):
    search = Field(List(Result), query=String(required=True))
    get_related_nodes = Field(List(RelatedNode), es_id=String(required=True))

    # リゾルバーは外部モジュールからインポートします
    resolve_search = resolve_search
    resolve_get_related_nodes = resolve_get_related_nodes


class ConfirmUserOutput(ObjectType):
    success = graphene.Boolean()
    message = graphene.String()


class ConfirmUser(Mutation):
    class Arguments:
        confirmation_code = String(required=True)

    Output = ConfirmUserOutput

    def mutate(root, info, confirmation_code):
        return resolve_confirm_user(confirmation_code)


class LoginUser(Mutation):
    class Arguments:
        email = String(required=True)
        password = String(required=True)

    Output = User

    def mutate(root, info, email, password):
        return resolve_login_user(email, password)


class CreateUser(Mutation):
    class Arguments:
        email = String(required=True)
        password = String(required=True)

    Output = CreateUserOutput

    def mutate(root, info, email, password):
        return resolve_create_user(email, password)


class AddFavorite(Mutation):
    class Arguments:
        email = String(required=True)
        nodeId = String(required=True)

    Output = Favorite

    def mutate(root, info, email, nodeId):
        return resolve_add_favorite(email, nodeId)


class RemoveFavorite(Mutation):
    class Arguments:
        email = String(required=True)
        nodeId = String(required=True)

    Output = Favorite

    def mutate(root, info, email, nodeId):
        return resolve_remove_favorite(email, nodeId)


class Mutation(ObjectType):
    create_user = CreateUser.Field()
    login_user = LoginUser.Field()
    confirm_user = ConfirmUser.Field()
    add_favorite = AddFavorite.Field()
    remove_favorite = RemoveFavorite.Field()


schema = Schema(query=Query, mutation=Mutation)
