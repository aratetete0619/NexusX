import os
import requests
from elasticsearch import Elasticsearch
from neo4j import GraphDatabase
from faker import Faker
from pathlib import Path

fake = Faker()

# Elasticsearchの接続
es = Elasticsearch()

# Neo4jの接続
password = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver("neo4j://localhost:7687", auth=("neo4j", password))


def add_person(tx, name, es_id, image_path):
    tx.run(
        "CREATE (:Person {name: $name, es_id: $es_id, image_path: $image_path})",
        name=name,
        es_id=es_id,
        image_path=image_path,
    )


def download_image(image_url, save_dir):
    response = requests.get(image_url, stream=True)
    response.raise_for_status()

    # 画像ファイル名を生成（ここではランダムな文字列を使用しますが、適切なファイル名を使用してください）
    image_file_name = f"{fake.unique.random_number(digits=6)}.jpg"
    image_path = Path(save_dir) / image_file_name

    with open(image_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

    return str(image_path)


# テストデータの生成と保存
for _ in range(1000):  # 生成するデータの数を設定
    name = fake.name()
    description = fake.text()

    # Elasticsearchに保存
    es_res = es.index(index="people", body={"description": description})
    es_id = es_res["_id"]

    # ランダムな画像をダウンロード
    image_url = "https://picsum.photos/200"  # 200x200のランダムな画像を生成
    image_path = download_image(image_url, "./demo_images")

    # Neo4jに保存
    with driver.session() as session:
        session.write_transaction(add_person, name, es_id, image_path)

driver.close()
