from graphene import ObjectType, String, Field, List, Float


class Properties(ObjectType):
    name = String()
    es_id = String()
    image_path = String()


class Neo4jData(ObjectType):
    identity = String()
    labels = List(String)
    properties = Field(Properties)
    elementId = String()


class Result(ObjectType):
    originalQuery = String()
    preprocessedQuery = String()
    neo4j_data = Field(Neo4jData)
    description = String()
    score = Float()


class User(ObjectType):
    id = String()
    email = String()
