
**テーブル：Users**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT | その他 |
| --- | --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES | |
| name | varchar(100) |  |  |  |  | |
| email | varchar(100) |  | INDEX, UNIQUE |  |  | |
| password | varchar(255) |  |  |  |  | |
| plan_type | varchar(20) |  |  | 'free' |  | |

**テーブル：Entities**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT | その他 |
| --- | --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES | |
| name | varchar(100) |  |  |  |  | |
| type | varchar(100) | YES |  |  |  | |
| created_at | datetime |  |  |  |  | |
| updated_at | datetime |  |  |  |  | |

**テーブル：Relationships**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT | その他 |
| --- | --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES | |
| entity1_id | bigint(20) |  | FOREIGN |  |  | |
| entity2_id | bigint(20) |  | FOREIGN |  |  | |
| relationship | varchar(100) | YES |  |  |  | |
| created_at | datetime |  |  |  |  | |
| updated_at | datetime |  |  |  |  | |

**テーブル：Feedbacks**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT | その他 |
| --- | --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES | |
| user_id | bigint(20) |  | FOREIGN |  |  | |
| feedback | text | YES |  |  |  | |
| created_at | datetime |  |  |  |  | |

**テーブル：Predictions**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT | その他 |
| --- | --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES | |
| entity1_id | bigint(20) |  | FOREIGN |  |  | |
| entity2_id | bigint(20) |  | FOREIGN |  |  | |
| predicted_relationship | varchar(100) | YES |  |  |  | |
| created_at | datetime |  |  |  |  | |

**テーブル：ReinforcementLearning**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO

 INCREMENT | その他 |
| --- | --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES | |
| user_id | bigint(20) |  | FOREIGN |  |  | |
| user_interaction | text | YES |  |  |  | |
| performance_metric | float | YES |  |  |  | |
| created_at | datetime |  |  |  |  | |

**テーブル：DataQuality**

| カラム名 | データ型 | NULL | キー | 初期値 | AUTO INCREMENT | その他 |
| --- | --- | --- | --- | --- | --- | --- |
| id | bigint(20) |  | PRIMARY |  | YES | |
| entity_id | bigint(20) |  | FOREIGN |  |  | |
| quality_score | float | YES |  |  |  | CHECK (quality_score BETWEEN 0 AND 1) |
| last_updated | datetime | YES |  |  |  | |
