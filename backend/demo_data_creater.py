import os
import requests
from elasticsearch import Elasticsearch
from neo4j import GraphDatabase
from faker import Faker
from pathlib import Path
import random

fake = Faker()

# Elasticsearchの接続
es = Elasticsearch()

# Neo4jの接続
password = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver("neo4j://localhost:7687", auth=("neo4j", password))


def add_person_with_skills(tx, name, person_es_id, image_path, skills):
    # パーソンノードを作成
    result = tx.run(
        "CREATE (p:Person {name: $name, es_id: $person_es_id, image_path: $image_path}) RETURN p",
        name=name,
        person_es_id=person_es_id,
        image_path=image_path,
    )
    person_node = result.single()[0]

    for skill_name, skill_es_id in skills:
        # スキルノードを作成または取得
        result = tx.run(
            "MERGE (s:Skill {name: $skill_name, es_id: $skill_es_id}) RETURN s",
            skill_name=skill_name,
            skill_es_id=skill_es_id,
        )
        skill_node = result.single()[0]

        # パーソンノードとスキルノードを関連付け
        tx.run(
            "MATCH (p:Person), (s:Skill) WHERE id(p) = $person_id AND id(s) = $skill_id "
            "CREATE (p)-[:HAS_SKILL]->(s)",
            person_id=person_node.id,
            skill_id=skill_node.id,
        )


def download_image(image_url, save_dir):
    response = requests.get(image_url, stream=True)
    response.raise_for_status()

    # 画像ファイル名を生成
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

    # ランダムな画像をダウンロード
    image_url = "https://picsum.photos/200"  # 200x200のランダムな画像を生成
    image_path = download_image(image_url, "./demo_images")

    # Elasticsearchに人物の詳細を保存
    person_es_res = es.index(
        index="people",
        body={"name": name, "description": description, "image_path": image_path},
    )
    person_es_id = person_es_res["_id"]

    # ランダムなスキルを生成
    skills = []
    for _ in range(random.randint(1, 5)):
        skill_name = fake.job()
        skill_description = fake.text()
        # Elasticsearchにスキルの詳細を保存
        skill_es_res = es.index(
            index="skills", body={"name": skill_name, "description": skill_description}
        )
        skill_es_id = skill_es_res["_id"]
        skills.append((skill_name, skill_es_id))

    # Neo4jに保存
    with driver.session() as session:
        session.write_transaction(
            add_person_with_skills, name, person_es_id, image_path, skills
        )

driver.close()
