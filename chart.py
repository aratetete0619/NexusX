from diagrams import Cluster, Diagram
from diagrams.aws.compute import Lambda
from diagrams.aws.database import Dynamodb
from diagrams.aws.network import APIGateway
from diagrams.onprem.vcs import Github
from diagrams.onprem.container import Docker
from diagrams.generic.database import SQL
from diagrams import Diagram, Cluster
from diagrams.custom import Custom
from diagrams.elastic.elasticsearch import Elasticsearch, Kibana
from diagrams.programming.framework import React
from diagrams.programming.language import Typescript, Javascript
from diagrams.programming.framework import GraphQL

with Diagram("System Architecture Diagram", show=False):

    with Cluster("Frontend"):
        frontend = [React("React.js"), Javascript(
            "Three.js"), Typescript("TypeScript")]

    with Cluster("Backend"):
        with Cluster("Serverless Compute"):
            compute = Lambda("AWS Lambda")
        with Cluster("ML Models"):
            ml_models = [Custom("spaCy & GINZA", "image_material2/SpaCy_logo.png"), Custom(
                "Keras", "image_material2/Keras_Logo.png"), Custom("TensorFlow", "image_material2/tensorflow.png"), Custom("Transformer based GPT", "image_material2/GPT_Logo.png")]
        with Cluster("Database"):
            db = Dynamodb("DynamoDB")
            graph_db = SQL("Neo4j")
        with Cluster("Search Engine"):
            search = Elasticsearch("Elasticsearch")

    with Cluster("Development Tools and Services"):
        dev_tools = [Github("Git"), Docker("Docker")]

    with Cluster("Infrastructure and Deployment"):
        deployment = [APIGateway("GraphQL API")]
        monitoring = Kibana("Kibana")

    api = GraphQL("GraphQL")

    frontend >> api >> compute
    compute >> db
    compute >> graph_db
    compute >> ml_models
    compute >> search
    db >> compute
    graph_db >> compute
    search >> compute
    ml_models >> compute
    compute >> deployment
    deployment >> monitoring
    monitoring >> compute
    api >> compute
    dev_tools - compute
    api >> frontend
