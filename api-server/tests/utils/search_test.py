import pytest
from app.utils.search_utils import get_related_nodes_from_neo4j


def test_get_related_nodes_from_neo4j():
    es_id = "hLPVs4kBMryiFFzFwOwG"
    result = get_related_nodes_from_neo4j(es_id)

    # Check that the function returns a non-empty list
    assert isinstance(result, list)
    assert len(result) > 0

    # Check that each item in the list is a dictionary with the expected keys
    for item in result:
        assert isinstance(item, dict)
        assert "neo4j_data" in item
        assert "description" in item
        assert "score" in item

        # Check that the "neo4j_data" field contains the expected sub-fields
        assert isinstance(item["neo4j_data"], tuple)
        assert len(item["neo4j_data"]) == 3
        start_node, relationship, end_node = item["neo4j_data"]
        assert "id" in start_node
        assert "labels" in start_node
        assert "properties" in start_node
        assert "name" in end_node["properties"]

    # Check that the Elasticsearch ID of the first node matches the expected value
    assert result[0]["neo4j_data"][0]["id"] == 2000
    assert result[0]["neo4j_data"][0]["properties"]["es_id"] == es_id
