import spacy
import re
import os
from langdetect import detect
from elasticsearch import Elasticsearch, TransportError, NotFoundError, ConnectionError
from neo4j import GraphDatabase


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
    query = query.lower()  # 小文字化
    query = re.sub(r"\W+", " ", query)  # 特殊文字をスペースに置換
    query = re.sub(r"\d+", "#", query)  # 数字をハッシュ記号に置換

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
    else:  # 複数の言語が混在していると判断した場合、SpacyとGinzaの両方を用いて処理します。
        doc_en = nlp_en(query)
        lemmas.extend([token.lemma_ for token in doc_en])
        doc_ja = nlp_ja(query)
        lemmas.extend([token.lemma_ for token in doc_ja])

    return " ".join(lemmas)


def get_data_from_neo4j(es_id):
    try:
        with driver.session() as session:
            result = session.run(
                "MATCH (n) WHERE n.es_id = $es_id RETURN n", es_id=es_id
            )
            return node_to_dict(result.single()[0])
    except Exception as e:
        return {"error": f"Failed to get data from Neo4j: {str(e)}"}


def calculate_score_based_on_neo4j_data(neo4j_data):
    # Neo4jのデータに基づいたスコアを計算する(行動履歴、評価など)
    # ここではダミーの関数として、常に1を返すようにしています
    return 1


def search_in_elasticsearch(preprocessed_query):
    try:
        es = Elasticsearch(["localhost:9200"])
    except ConnectionError as e:
        return {"error": str(e)}

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
            ]
            + proximity_queries
        }
    }

    try:
        response = es.search(index="people", body={"query": query, "size": 24})
    except (TransportError, NotFoundError) as e:
        return {"error": str(e)}

    search_results = response["hits"]["hits"]

    # Elasticsearchから取得したIDを使用してNeo4jからデータを取得し、結果を組み合わせる
    combined_results = []
    for result in search_results:
        es_id = result["_id"]
        es_score = result["_score"]
        description = result["_source"]["description"]
        neo4j_data = get_data_from_neo4j(es_id)
        neo4j_score = calculate_score_based_on_neo4j_data(neo4j_data)
        combined_score = es_score * neo4j_score  # ElasticsearchのスコアとNeo4jのスコアを組み合わせる
        combined_results.append(
            {
                "neo4j_data": neo4j_data,
                "description": description,
                "score": combined_score,
            }
        )

    return combined_results
