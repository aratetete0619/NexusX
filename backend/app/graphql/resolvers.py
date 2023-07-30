from ..utils.search_utils import search_in_elasticsearch, preprocess_query
from ..utils.database import create_connection, create_user
from .types import Result
from ..utils.auth import hash_password, check_password_strength


def resolve_search(root, info, query):
    preprocessed_query = preprocess_query(query)
    combined_results = search_in_elasticsearch(preprocessed_query)
    # 結果をResultオブジェクトのリストとして返します
    return [
        Result(originalQuery=query, preprocessedQuery=preprocessed_query, **result)
        for result in combined_results
    ]


def resolve_create_user(email, password):
    # パスワード強度のチェック
    if not check_password_strength(password):
        raise HTTPException(
            status_code=400, detail="Password strength is not sufficient"
        )

    connection = create_connection()
    password_hash = hash_password(password)  # パスワードをハッシュ化
    user_id = create_user(connection, email, password_hash)
    connection.close()

    # 作成したユーザーの情報を返す
    return {"id": user_id, "email": email}
