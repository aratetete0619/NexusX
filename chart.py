from diagrams import Cluster, Diagram
from diagrams.aws.compute import Lambda
from diagrams.aws.database import Dynamodb
from diagrams.aws.network import APIGateway
from diagrams.aws.ml import Rekognition
from diagrams.onprem.iac import Terraform
from diagrams.onprem.vcs import Github
from diagrams.onprem.container import Docker
from diagrams.generic.database import SQL
from diagrams.programming.language import Python
from diagrams.onprem.network import Nginx
from diagrams.onprem.compute import Server
from diagrams import Diagram, Cluster, Edge
from diagrams.generic.blank import Blank
from diagrams import Diagram, Cluster
from diagrams.custom import Custom


with Diagram("System Architecture Diagram", show=False):

    with Cluster("Frontend"):
        web_rendering = Python("WebGPU")

    with Cluster("Backend"):
        with Cluster("Serverless Compute"):
            compute = Lambda("AWS Lambda")
        with Cluster("ML Models"):
            ml_models = [Custom("spaCy & GINZA", "./image_material2/SpaCy_logo.png"
                                ), Custom(
                "Keras",  "./image_material2/Keras_logo.png"), Custom("TensorFlow", "./image_material2/tensorflow.png")]
        with Cluster("Database"):
            db = Dynamodb("DynamoDB")
            graph_db = SQL("Neo4j")
        with Cluster("Search Engine"):
            search = Custom("Elasticsearch",
                            "./image_material2/Elasticsearch_logo.png")

    with Cluster("Development Tools and Services"):
        dev_tools = [Github("Git"), Docker("Docker")]

    with Cluster("Infrastructure and Deployment"):
        deployment = [APIGateway("GraphQL API"), Nginx("Server")]
        monitoring = Custom("Kibana", "./image_material2/kibana.png")

    web_rendering >> compute
    compute >> db
    compute >> graph_db
    compute >> ml_models
    compute >> search
    db >> compute
    graph_db >> compute
    search >> compute
    ml_models >> compute
    dev_tools >> compute
    compute >> deployment
    deployment >> monitoring
    monitoring >> compute
