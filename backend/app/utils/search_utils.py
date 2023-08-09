import spacy
import re
import os
from langdetect import detect
from elasticsearch import Elasticsearch, TransportError, NotFoundError, ConnectionError
from neo4j import GraphDatabase
from graphql import GraphQLError
from typing import Dict
from neo4j.exceptions import ServiceUnavailable
import logging
from neo4j.graph import Node, Relationship


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


nlp_ja = spacy.load("ja_ginza")
nlp_en = spacy.load("en_core_web_sm")
indices = ["people", "concepts", "events"]

# Neo4jへの接続を作成
uri = "bolt://localhost:7687"
password = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver(uri, auth=("neo4j", password))


def node_to_dict(node):
    return {
        "id": node.id,
        "labels": list(node.labels),
        "properties": dict(node),
    }


def preprocess_query(query):
    # 文字列の正規化
    query = query.lower()
    query = re.sub(r"\W+", " ", query)
    query = re.sub(r"\d+", "#", query)

    # 言語検出
    try:
        detected_lang = detect(query)
    except:
        detected_lang = "unknown"

    lemmas = []

    # 形態素解析
    if detected_lang == "en":
        doc = nlp_en(query)
        lemmas = [token.lemma_ for token in doc]
    elif detected_lang == "ja":
        doc = nlp_ja(query)
        lemmas = [token.lemma_ for token in doc]
    else:
        doc_en = nlp_en(query)
        lemmas.extend([token.lemma_ for token in doc_en])
        doc_ja = nlp_ja(query)
        lemmas.extend([token.lemma_ for token in doc_ja])

    return " ".join(lemmas)


def get_data_from_neo4j(es_id):
    with driver.session() as session:
        result = session.run(
            "MATCH (n) WHERE n.es_id = $es_id RETURN n", {"es_id": es_id}
        )
        try:
            node = result.single().value()
            node_dict = {
                "identity": node.id,
                "labels": list(node.labels),
                "properties": dict(node),
            }
            return node_dict
        except ServiceUnavailable:
            return {"error": "Failed to connect to the database."}
        except Exception as e:
            return {"error": "An error occurred while executing the query."}


def calculate_score_based_on_neo4j_data(neo4j_data):
    # Neo4jのデータに基づいたスコアを計算する(行動履歴、評価など)
    # ここではダミーの関数として、常に1を返すようにしています
    return 1


def search_in_elasticsearch(preprocessed_query):
    try:
        es = Elasticsearch(["localhost:9200"])
    except ConnectionError as e:
        return {"error": "An error occurred while connecting to the search service."}

    words = preprocessed_query.split()

    proximity_queries = []
    for i in range(len(words)):
        for j in range(i + 1, len(words)):
            proximity_queries.append(
                {
                    "span_near": {
                        "clauses": [
                            {"span_term": {"description": words[i]}},
                            {"span_term": {"description": words[j]}},
                        ],
                        "slop": 5,
                        "in_order": False,
                    }
                }
            )

    query = {
        "bool": {
            "should": [
                {
                    "match_phrase": {
                        "description": {"query": preprocessed_query, "boost": 1.0}
                    }
                },
                {
                    "match": {
                        "description": {
                            "query": preprocessed_query,
                            "fuzziness": "AUTO",
                            "boost": 1.0,
                        }
                    }
                },
                {"match_phrase": {"name": {"query": preprocessed_query, "boost": 2.0}}},
                {
                    "match": {
                        "name": {
                            "query": preprocessed_query,
                            "fuzziness": "AUTO",
                            "boost": 2.0,
                        }
                    }
                },
            ]
            + proximity_queries
        }
    }

    try:
        response = es.search(index="people", body={"query": query, "size": 24})
    except (TransportError, NotFoundError) as e:
        return {"error": "An error occurred while executing the search."}

    hits = response["hits"]["hits"]
    processed_hits = []
    for hit in hits:
        es_id = hit["_id"]
        description = hit["_source"]["description"]
        neo4j_data = get_data_from_neo4j(es_id)
        if isinstance(neo4j_data, dict):
            processed_hit = {
                "identity": neo4j_data["identity"],
                "labels": neo4j_data["labels"],
                "properties": {**neo4j_data["properties"], "description": description},
            }
            processed_hits.append(processed_hit)
        else:
            # handle error here, for example:
            print(f"Error: Expected a dict but got {type(neo4j_data)}")

    return processed_hits


def get_description_from_elasticsearch(es_id, index):
    try:
        es = Elasticsearch(["localhost:9200"])
    except ConnectionError as e:
        raise GraphQLError("An error occurred while connecting to the search service.")

    try:
        print(
            f"Attempting to retrieve data from Elasticsearch with es_id: {es_id} and index: {index}"
        )  # Add this line
        response = es.get(index=index, id=es_id)
        print(f"Retrieved data from Elasticsearch: {response}")  # Add this line
        return response["_source"]["description"]
    except (TransportError, NotFoundError) as e:
        raise GraphQLError("An error occurred while retrieving data.")


def get_related_nodes_from_neo4j(es_id):
    logger.debug(f"Getting related nodes for es_id: {es_id}")
    try:
        with driver.session() as session:
            result = session.run(
                """
                MATCH (n)-[r]-(m) WHERE n.es_id = $es_id
                RETURN n, r, m
                """,
                es_id=es_id,
            )
            logger.debug(f"result: {result}")
            related_nodes = [
                {
                    "start_node": element_to_dict(record["n"]),
                    "relationship": element_to_dict(record["r"]),
                    "end_node": element_to_dict(record["m"]),
                    "score": 1,
                }
                for record in result
            ]
            logger.debug(f"Related nodes: {related_nodes}")
            return related_nodes
    except Exception as e:
        logger.error(f"Error occurred: {e}")
        raise GraphQLError("An error occurred while retrieving data.")


def element_to_dict(element):
    index = ""  # Set initial value for index
    element_dict = {
        "identity": element.id,
        "properties": getattr(element, "_properties", {}),
    }
    print(f"エレメンと1　 {element_dict}")
    if isinstance(element, Node):
        # Convert the frozenset to a list
        element_dict["labels"] = list(element.labels)

        # The index is set to 'people' if 'Person' is in the labels, otherwise it is the first label
        if "Person" in element.labels:
            index = "people"
        elif "Skill" in element.labels:
            index = "skills"
        elif element.labels:
            index = list(element.labels)[0]
        else:
            raise ValueError("Element labels should not be empty")
    elif isinstance(element, Relationship):
        element_dict["type"] = element.type
        index = element.type
    if "es_id" in element_dict["properties"]:
        try:
            description = get_description_from_elasticsearch(
                element_dict["properties"]["es_id"], index=index
            )
            if description:
                element_dict["properties"]["description"] = description
        except GraphQLError as e:
            print(f"Failed to get description from Elasticsearch: {e}")
    print(f"エレメンと2　 {element_dict}")
    return element_dict
