# schema.py

from graphene import ObjectType, String, Field, List, Float, Schema
from .resolvers import resolve_search  # resolvers.pyから関数をインポート
from .types import Result  # types.pyから型をインポート


class Query(ObjectType):
    search = Field(List(Result), query=String(required=True))

    # リゾルバーは外部モジュールからインポートします
    resolve_search = resolve_search


schema = Schema(query=Query)
