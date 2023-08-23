from typing import Dict
from neo4j import GraphDatabase
from neo4j.exceptions import ServiceUnavailable
from graphql import GraphQLError
import logging
import os
from dotenv import load_dotenv

# 環境変数をロード
load_dotenv()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Neo4jへの接続設定
uri = os.getenv("NEO4J_URI")
password = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver(uri, auth=("neo4j", password))


def save_node_to_neo4j(node: Dict):
    query = (
        "MERGE (n:Node {id: $id}) "
        "ON CREATE SET "
        "n.name = $name, "
        "n.description = $description, "
        "n.color = $color, "
        "n.backgroundColor = $backgroundColor, "
        "n.x = $x, "
        "n.y = $y "
        "ON MATCH SET "
        "n.name = $name, "
        "n.description = $description, "
        "n.color = $color, "
        "n.backgroundColor = $backgroundColor, "
        "n.x = $x, "
        "n.y = $y "
        "RETURN n.id"
    )

    parameters = {
        "id": node["id"],
        "name": node["name"],
        "description": node.get("description", ""),
        "color": node.get("color", "default_color_value"),
        "backgroundColor": node.get("backgroundColor", "default_color_value"),
        "x": node["x"],
        "y": node["y"],
    }

    with driver.session() as session:
        try:
            result = session.run(query, parameters)
            neo4j_node_id = result.single().value()
            return neo4j_node_id
        except ServiceUnavailable as e:
            logger.error(f"Failed to save node to Neo4j: {e}")
            raise GraphQLError("Failed to save node to Neo4j.")


def get_node_info_from_neo4j(node_id):
    query = (
        "MATCH (n:Node) "
        "WHERE n.id = $node_id "
        "RETURN n.id, n.name, n.description, n.color, "
        "n.backgroundColor, n.x, n.y"
    )

    parameters = {"node_id": node_id}

    with driver.session() as session:
        try:
            result = session.run(query, parameters)
            record = result.single()

            if record is None:  # 追加
                return None

            node_info = {
                "id": record.get("n.id", None),
                "name": record.get("n.name", ""),
                "description": record.get("n.description", ""),
                "color": record.get("n.color", "default_color_value"),
                "backgroundColor": record.get(
                    "n.backgroundColor", "default_background_color_value"
                ),
                "x": record.get("n.x", 0.0),
                "y": record.get("n.y", 0.0),
            }
            return node_info
        except ServiceUnavailable as e:
            logger.error(f"Failed to get node info from Neo4j: {e}")
            raise GraphQLError("Failed to retrieve node information from Neo4j.")


def update_node_position_in_neo4j(node_id: str, x: int, y: int) -> bool:
    """
    Update the position of a node in Neo4j.
    """
    query = "MATCH (n:Node {id: $node_id}) " "SET n.x = $x, n.y = $y " "RETURN n.id"

    parameters = {"node_id": node_id, "x": x, "y": y}

    with driver.session() as session:
        try:
            result = session.run(query, parameters)
            updated_node_id = result.single().value()
            return True if updated_node_id else False
        except ServiceUnavailable as e:
            logger.error(f"Failed to update node position in Neo4j: {e}")
            return False


def delete_node_from_neo4j(node_id: str) -> bool:
    """
    Delete a node from Neo4j.
    """
    query = (
        "MATCH (n:Node {id: $node_id}) "
        "DETACH DELETE n "
        "RETURN COUNT(n) as deleted_count"
    )

    parameters = {"node_id": node_id}

    with driver.session() as session:
        try:
            result = session.run(query, parameters)
            deleted_count = result.single().get("deleted_count", 0)
            return deleted_count > 0
        except ServiceUnavailable as e:
            logger.error(f"Failed to delete node from Neo4j: {e}")
            return False
