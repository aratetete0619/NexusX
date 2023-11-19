import os
import requests
from elasticsearch import Elasticsearch
from neo4j import GraphDatabase
from faker import Faker
from pathlib import Path
import random
from app.utils.database import create_connection
import uuid


fake = Faker()

# Elasticsearchの接続
es = Elasticsearch()

# Neo4jの接続
password = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver("neo4j://localhost:7687", auth=("neo4j", password))


def insert_node_media(connection, node_id, media_type, media_path):
    cursor = connection.cursor()
    query = (
        "INSERT INTO NodeMedia (node_id, media_type, media_path) VALUES (%s, %s, %s)"
    )
    cursor.execute(query, (node_id, media_type, media_path))
    connection.commit()


def add_restaurant_with_menus(tx, name, restaurant_es_id, image_path, menus):
    # レストランノードを作成
    result = tx.run(
        "CREATE (r:Restaurant {name: $name, es_id: $restaurant_es_id, image_path: $image_path}) RETURN r",
        name=name,
        restaurant_es_id=restaurant_es_id,
        image_path=image_path,
    )
    restaurant_node = result.single()[0]

    for menu in menus:
        menu_name, menu_es_id, origin = menu
        # メニューノードを作成または取得
        result = tx.run(
            "MERGE (m:Menu {name: $menu_name, es_id: $menu_es_id, origin: $origin}) RETURN m",
            menu_name=menu_name,
            menu_es_id=menu_es_id,
            origin=origin,
        )
        menu_node = result.single()[0]

        # レストランノードとメニューノードを関連付け
        tx.run(
            "MATCH (r:Restaurant), (m:Menu) WHERE id(r) = $restaurant_id AND id(m) = $menu_id "
            "CREATE (r)-[:OFFERS]->(m)",
            restaurant_id=restaurant_node.id,
            menu_id=menu_node.id,
        )


# 100件の架空のレストランとそのメニューを生成
fake_restaurants = [
    {
        "name": f"FakeRestaurant_{i+1}",
        "description": fake.catch_phrase(),
        "image_path": f"https://picsum.photos/200?random={i}",
        "menus": [
            (f"Menu_{2*i+1}", str(uuid.uuid4()), fake.country()),
            (f"Menu_{2*i+2}", str(uuid.uuid4()), fake.country()),
        ],
    }
    for i in range(100)
]

# データベースにデータを保存
for restaurant in fake_restaurants:
    name = restaurant["name"]
    description = restaurant["description"]
    image_path = restaurant["image_path"]

    # Elasticsearchにレストラン情報を保存
    restaurant_es_res = es.index(
        index="restaurants",
        body={"name": name, "description": description, "image_path": image_path},
    )
    restaurant_es_id = restaurant_es_res["_id"]

    # Neo4jにデータを保存
    with driver.session() as session:
        session.write_transaction(
            add_restaurant_with_menus,
            name,
            restaurant_es_id,
            image_path,
            restaurant["menus"],
        )

    # MySQLにメディア情報を保存（この部分はあなたの環境に合わせて調整が必要かもしれません）
    connection = create_connection()
    if connection:
        insert_node_media(connection, restaurant_es_id, "image", image_path)
        connection.close()

driver.close()
