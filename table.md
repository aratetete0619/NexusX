フェーズ1のテーブル設計

**テーブル：Users**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
| --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES |
| name | varchar(100) |  |  |  |  |
| email | varchar(100) |  | INDEX |  |  |
| password | varchar(255) |  |  |  |  |

**テーブル：Entities**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
| --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES |
| name | varchar(100) |  |  |  |  |
| type | varchar(100) | YES |  |  |  |

**テーブル：Relationships**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
| --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES |
| entity1_id | bigint(20) |  | FOREIGN |  |  |
| entity2_id | bigint(20) |  | FOREIGN |  |  |
| relationship | varchar(100) | YES |  |  |  |

フェーズ2のテーブル設計

**テーブル：Feedbacks**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
| --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES |
| user_id | bigint(20) |  | FOREIGN |  |  |
| feedback | text | YES |  |  |  |

**テーブル：Predictions**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
| --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES |
| entity1_id | bigint(20) |  | FOREIGN |  |  |
| entity2_id | bigint(20) |  | FOREIGN |  |  |
| predicted_relationship | varchar(100) | YES |  |  |  |

フェーズ3のテーブル設計

**テーブル：ReinforcementLearning**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
| --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES |
| user_interaction | text | YES |  |  |  |
| performance_metric | float | YES |  |  |  |


**テーブル：DataQuality**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT |
| --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES |
| entity_id | bigint(20) |  | FOREIGN |  |  |
| quality_score | float | YES |  |  |  |
| last_updated | datetime | YES |  |  |  |



![ER Diagram](https://showme.redstarplugin.com/d/yEUmww5x)


- Users
- Entities
- Relationships
- Feedbacks
- Predictions
- ReinforcementLearning
- DataQuality
