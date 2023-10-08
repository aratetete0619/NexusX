from elasticsearch import Elasticsearch
from neo4j import GraphDatabase
import uuid
import os  # 環境変数を取得するために追加
from dotenv import load_dotenv

# 環境変数をロード
load_dotenv()

# Elasticsearchの接続
es = Elasticsearch()

# 環境変数からNeo4jの接続設定を取得
uri = os.getenv("NEO4J_URI")
password = os.getenv("NEO4J_PASSWORD")

if uri is None or password is None:
    raise EnvironmentError("NEO4J_URI and/or NEO4J_PASSWORD are not set")

# Neo4jの接続
driver = GraphDatabase.driver(uri, auth=("neo4j", password))

# デモデータ
restaurants = [
    ("L’Effervescence", "フレンチ", "東京都港区西麻布", 2016),
    ("神田", "日本料理", "東京都港区", 2010),
    ("さぜんか", "中国料理", "東京都中央区", 2020),
    ("石川", "日本料理", "東京都新宿区神楽坂", 2008),
    ("すし吉武", "寿司", "東京都中央区銀座", 2012),
]

# レストラン情報をElasticsearchに保存し、Neo4jでes_idを追加する
for name, cuisine_type, location, michelin_year in restaurants:
    es_id = str(uuid.uuid4())
    es_body = {
        "name": name,
        "type": cuisine_type,
        "location": location,
        "michelin_stars": 3,
        "description": f"{michelin_year}年からミシュラン三ツ星を獲得し、{cuisine_type}で知られる。",
    }
    es.index(index="restaurants", id=es_id, body=es_body)

    with driver.session() as session:
        session.run(
            "MERGE (r:Restaurant {name: $name}) SET r.es_id = $es_id",
            name=name,
            es_id=es_id,
        )

driver.close()
