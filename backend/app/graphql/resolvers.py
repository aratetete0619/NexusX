from ..utils.search_utils import search_in_elasticsearch, preprocess_query
from .types import Result


def resolve_search(root, info, query):
    preprocessed_query = preprocess_query(query)
    combined_results = search_in_elasticsearch(preprocessed_query)
    # 結果をResultオブジェクトのリストとして返します
    return [
        Result(originalQuery=query, preprocessedQuery=preprocessed_query, **result)
        for result in combined_results
    ]
