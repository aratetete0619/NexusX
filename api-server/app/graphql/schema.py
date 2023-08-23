from graphene import (
    ObjectType,
    String,
    Field,
    List,
    Schema,
    Mutation,
    Boolean,
    InputObjectType,
    Int,
)
from .resolvers import (
    resolve_search,
    resolve_create_user,
    resolve_login_user,
    resolve_confirm_user,
    resolve_get_related_nodes,
    resolve_add_favorite,
    resolve_remove_favorite,
    resolve_get_favorites,
    resolve_google_login,
    resolve_save_user_page,
    resolve_delete_user_page,
    resolve_save_page_data,
    resolve_delete_node,
    resolve_get_nodes_by_page_id,
    resolve_update_node_position,
)
from .types import (
    Result,
    User,
    CreateUserOutput,
    RelatedNode,
    Favorite,
    AuthResponse,
    UserPage,
    PageNodeInput,
    DeleteNodeResponse,
    NodeInfo,
)
import graphene
from ..utils.database import delete_node_from_db


class Query(ObjectType):
    search = Field(List(Result), query=String(required=True))
    get_related_nodes = Field(List(RelatedNode), es_id=String(required=True))
    get_nodes_by_page_id = Field(List(NodeInfo), pageId=String(required=True))

    resolve_search = resolve_search
    resolve_get_related_nodes = resolve_get_related_nodes
    resolve_get_nodes_by_page_id = resolve_get_nodes_by_page_id


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


class AuthenticateWithGoogle(Mutation):
    class Arguments:
        tokenId = String(required=True)

    Output = AuthResponse

    def mutate(root, info, tokenId):
        return resolve_google_login(tokenId)


class SaveUserPage(Mutation):
    class Arguments:
        email = String(required=True)
        page_id = String(required=True)

    Output = UserPage

    def mutate(root, info, email, page_id):
        return resolve_save_user_page(email, page_id)


class DeleteUserPage(Mutation):
    class Arguments:
        email = String(required=True)
        page_id = String(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(root, info, email, page_id):
        return resolve_delete_user_page(root, info, email, page_id)


class PageDataInputType(InputObjectType):
    page_node_id = Int(required=True)
    user_page_id = Int(required=True)
    media_id = Int(required=True)


class SavePageDataOutput(ObjectType):
    success = Boolean(required=True)
    message = String()


class SavePageData(Mutation):
    class Arguments:
        email = String(required=True)
        page_id = String(required=True)
        data = PageNodeInput(required=True)

    Output = SavePageDataOutput

    def mutate(root, info, email, page_id, data):
        return resolve_save_page_data(root, info, email, page_id, data)


class DeleteNode(Mutation):
    class Arguments:
        nodeId = String(required=True)

    Output = DeleteNodeResponse

    def mutate(self, info, nodeId):
        return resolve_delete_node(info, nodeId)


class UpdateNodePosition(Mutation):
    class Arguments:
        nodeId = String(required=True)
        x = Int(required=True)
        y = Int(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, nodeId, x, y):
        return resolve_update_node_position(info, nodeId, x, y)


class Mutation(ObjectType):
    create_user = CreateUser.Field()
    login_user = LoginUser.Field()
    confirm_user = ConfirmUser.Field()
    add_favorite = AddFavorite.Field()
    remove_favorite = RemoveFavorite.Field()
    authenticate_with_google = AuthenticateWithGoogle.Field()
    save_user_page = SaveUserPage.Field()
    delete_user_page = DeleteUserPage.Field()
    save_page_data = SavePageData.Field()
    delete_node = DeleteNode.Field()
    update_node_position = UpdateNodePosition.Field()


schema = Schema(query=Query, mutation=Mutation)
