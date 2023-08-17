from graphene import ObjectType, String, Field, List, Float
import graphene


class Properties(ObjectType):
    name = String()
    es_id = String()
    image_path = String()
    description = String()


class Neo4jData(ObjectType):
    identity = String()
    labels = List(String)
    properties = Field(Properties)
    elementId = String()


class Result(ObjectType):
    originalQuery = String()
    preprocessedQuery = String()
    startNode = Field(Neo4jData)
    neo4j_data = Field(Neo4jData)
    score = Float()


class RelatedNodeData(ObjectType):
    identity = String()
    labels = List(String)
    properties = Field(Properties)
    startNode = Field(Neo4jData)
    relationship = Field(Neo4jData)
    endNode = Field(Neo4jData)


class RelatedNode(ObjectType):
    original_query = String()
    preprocessed_query = String()
    startNode = Field(Neo4jData)
    relationship = Field(Neo4jData)
    endNode = Field(Neo4jData)
    score = Float()


class User(ObjectType):
    id = String()
    email = String()
    token = graphene.String()
    confirmed = graphene.Boolean()


class CreateUserOutput(ObjectType):
    id = String()
    email = String()
    message = String()
    confirmationUrl = String()


class RelationshipProperties(ObjectType):
    name = String()
    es_id = String()
    image_path = String()
    description = String()


class Relationship(ObjectType):
    identity = String()
    type = String()
    properties = Field(RelationshipProperties)


class NodeProperties(ObjectType):
    name = String()
    es_id = String()
    image_path = String()
    description = String()


class Node(ObjectType):
    identity = String()
    labels = List(String)
    properties = Field(NodeProperties)


class RelatedNode(ObjectType):
    originalQuery = String()
    preprocessedQuery = String()
    startNode = Field(Node)
    relationship = Field(Relationship)
    endNode = Field(Node)
    score = String()


class Favorite(ObjectType):
    email = String()
    nodeId = String()


class AuthResponse(ObjectType):
    id = String()
    email = String()
    token = String()
    message = String()


class UserPage(ObjectType):
    page_id = String()
    email = String()
    created_at = String()
