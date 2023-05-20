## 🌐概要: 
このプロジェクトは、ユーザーがさまざまな関連性を視覚的に探求できるアプリケーションを構築します。ユーザーの検索に基づいて、映画やドラマのキャラクター間の関係図、ウェブサイトの外部リンク、芸能人の交流、あるいはテクノロジー間の結びつきといった「つながり」を視覚化します。ユーザーは、この関係図を直感的に操作し、その背後にある関連性の理由を理解することができます。さらに、作成した図は、共有やプレゼンテーションの資料作成に利用することも可能です。

## 🎯目的: 
全ての事象には何らかのつながりがあり、その可視化は事象を理解するための重要な要素です。ビジネス、人間関係、科学、歴史などのさまざまな領域で事象の相互作用や関連性を把握することで、より深い理解につながります。

## 🏗️背景(余談)
このアプリケーションは、私の長年の哲学への興味と、ITという革新的なテクノロジーとの間に存在する橋を架けることの可能性を探求するという独自の視点から誕生しました。私が社会で確立されている概念や制度の背後にある思想や理由を理解しようとする根源的な好奇心は、私がまだ子供の頃から持っていました。それはまた、人々が日々直面する現実の理解と解釈、さらにそれを改善しようという志向を形にする道を探す動機とも繋がっています。

それから私は一歩進んで、哲学的な思考とプログラミング、特にオブジェクト指向という概念を結びつける試みを始めました。オブジェクト指向の基本的な原理は、現実世界を独立したオブジェクトへと分割し、それぞれが固有の属性と振る舞いを持つという考え方を持っています。この考え方を哲学的視野に適用すると、存在するもの全てとの相互関係の理解に新たな視点をもたらす可能性があると確信しました。

そのような視野から、私はこのアプリケーションの制作に取り掛かろうと思いました。私の目指すところは、哲学的な視野とプログラミングの方法論がどのように結びつき、相互に影響を与え合うのかを示すことです。アプリケーションはただユーザーの問題を解決するためのツールであるだけではなく、哲学と科学が交わる場であり、それによって新たな視点や理解が生まれる可能性を秘めていると信じています。

## 👥ターゲット: 
1. 教育関係者：教師や学生は、教材や学習内容を視覚化し、理解を深めるためにこのアプリケーションを使用することができます。たとえば、歴史教師は重要な出来事の間の関連性を示すため、科学教師は科学的な概念やプロセスを説明するために関連図を使用することができます。

2. ビジネスパーソン：ビジネスパーソンは、企業間の関係、マーケットトレンド、競合分析などを視覚化するためにこのアプリケーションを活用できます。

3. リサーチャー/分析家：リサーチャーや分析家は、データや情報を視覚化し、複雑な関連性を理解しやすくするためにこのアプリケーションを使用することができます。

4. クリエイティブライター：物語のプロットやキャラクターの関係を視覚化することで、ストーリーテリングを助けるためにこのアプリケーションを利用することができます。

5. 自己啓発に興味がある個人：個人の思考や考えのパターン、人間関係、人生の出来事などを視覚化するためにこのアプリケーションを使用することができます。

6. ジャーナリスト: ジャーナリストは記事のリサーチ過程で、人物や組織の相互関連や時間的な出来事の流れを視覚化するためにこのツールを利用できます。

7. ソーシャルメディアマネージャー: ユーザーや投稿の間のインタラクションを視覚化し、コミュニティの動向やトレンドを理解するために利用できます。



## ⚙️主要機能:

1. **入力されたデータの関連の可視化**: ユーザーが入力したデータやキーワードに基づいて関連性のあるエンティティを探し出し、それらの関連性をグラフィカルに可視化します。

2. **インタラクティブな操作**: ユーザーは関連図のノードやエッジの追加、削除、編集を直感的に行うことができます。

3. **ドメインやサービスの自動判別と分類**: 入力されたデータに基づいて、それがどのドメインやサービスに関連しているのかを自動的に判別し、適切に分類します。

4. **機械学習モデルを利用した関連の抽出**: TensorFlowやKerasなどの機械学習ライブラリを活用して、テキストからエンティティとその関連性を抽出します。

5. **共有機能**: ユーザーが作成した関連図は簡単に共有することができ、他のユーザーやチームとのコラボレーションを促進します。

6. **リアルタイムアップデート**: ユーザーが作成した関連図は、新しい情報が利用可能になるとリアルタイムで更新されます。

7. **パーソナライズされたアラート**: ユーザーが特定のトピックやキーワードについて新しい関連性が見つかったときに通知を受け取ることができます。

8. **AIを活用した関連性の発見:**: GPTや他のML技術を活用して、テキスト中に暗黙的に存在する関連性を発見し、ユーザーに新たな視点や洞察を提供します。

9. **ソーシャルメディアの統合**: ユーザーが作成した関連図を直接ソーシャルメディアに共有できます。

10. **アクセシビリティ機能**: 色覚異常や視覚障害を持つユーザーでも利用できるよう、色の選択、コントラスト、フォントサイズなどの調整が可能なアクセシビリティ設定を提供します。


## 🛠️非機能要件:

1. **パフォーマンス**: アプリケーションは大量のデータを扱い、リアルタイムの情報更新を行うため、高速なデータ処理とレスポンス時間を保証する必要があります。

2. **スケーラビリティ**: ユーザー数やデータ量が増えたときにも、システムは安定して動作し続け、効率的にスケールアップできるように設計されていることが求められます。

3. **セキュリティ**: ユーザーデータのプライバシーを保護し、不正アクセスやデータ漏えいを防ぐための適切なセキュリティ対策が取られていることが必要です。

4. **可用性**: サービスは24時間365日稼働し、ダウンタイムが最小限に抑えられていることが求められます。

5. **維持管理性**: システムは簡単に更新や修正ができるように設計されていることが必要です。また、バグや問題が発生した場合に迅速に対応できるようなロギングとモニタリングの機能も必要です。

6. **ユーザビリティ**: インターフェースは直感的で使いやすく、全てのユーザーが必要な情報に簡単にアクセスできるようにすることが重要です。また、視覚障害者や色覚異常者でも利用できるよう、アクセシビリティの要件も考慮する必要があります。

7. **互換性**: アプリケーションは主要なウェブブラウザやデバイスで問題なく動作することが必要です。

8. **テスト可能性**: システムはテストしやすいように設計されており、ユニットテスト、統合テスト、エンドツーエンドテストが容易に実装できることが求められます。

9. **信頼性**: システムは高い信頼性を保つために、冗長性とリカバリ機能を有していることが必要です。

10. **拡張性**: システムは新機能の追加や既存機能の改善を容易にするため、モジュール性と拡張性を持っていることが求められます。

## バックエンド開発環境:
- NLPライブラリ: spaCyとGINZA
- マシンラーニングライブラリ: TensorFlow、Keras
- マシンラーニングモデル: TransformerベースのGPT

## フロントエンド開発環境:

- ライブラリ: React.js
- 3D描画ライブラリ: Three.js
- プログラミング言語: TypeScript

## データベース:

- データベース管理システム: DynamoDB（ユーザーデータやその他の非グラフ型データを保存するため）
- グラフデータベース: Neo4j（エンティティ間の関連性を保存およびクエリするため

## 開発ツールおよびサービス:

- 検索エンジン: Elasticsearch
- データ可視化ツール: Kibana
- バージョン管理: Git
- コンテナ化: Docker
- コンテナオーケストレーション: Kubernetes

##  インフラストラクチャおよびデプロイメント:

- サーバーレスコンピューティングサービス: AWS Lambda
- API Gateway: AWS API Gateway
- 機械学習プラットフォーム: Amazon SageMaker
- ウェブクローリングとテキスト解析: Amazon EC2/ECS
- クラウドサービス: AWS

## API: 
- APIの設計とクエリ言語: GraphQL

## プロジェクト管理ツール:
- Jira Confluence

## 🤖アプリの挙動: 
以下に、アプリケーションのシステムのフローチャートを示します。この図は、ユーザーからの検索クエリがシステムを通過し、最終的に視覚的なデータとしてユーザーに表示されるまでのプロセスを示しています。


![システム構成図](https://showme.redstarplugin.com/s/uCcyHNoP)

この図は、ユーザーからの検索クエリがシステムを通過し、最終的に視覚的なデータとしてユーザーに表示されるまでのプロセスを示しています。

1. **ユーザーインタラクション**: ユーザーがアプリケーションで何かを検索すると、そのリクエストはGraphQL APIを経由してバックエンドに送信されます。これにより、クライアントは必要なデータのみを指定してリクエストでき、サーバーの負荷を減らすことができます。ユーザビリティを改善するために、このインターフェースはシンプルで直感的なものにする必要があります。

2. **データの取得と解析**: Amazon EC2インスタンスが指定されたウェブページをクロールします。次に、spaCyとGINZAを使用してテキストからエンティティとその関係性を抽出します。このプロセスは、パフォーマンスを向上させるために最適化され、非同期処理を活用する必要があります。

3. **データの保存とインデックス化**: 抽出した情報はNeo4jとDynamoDBに保存されます。同時に、Elasticsearchは新たに抽出した情報をインデックス化し、素早い検索を可能にします。

4. **データの検索と取得**: ユーザーが特定のエンティティや関係性を探すと、GraphQL APIは適切な検索クエリをElasticsearchに送信します。Elasticsearchはその結果を返し、それがユーザーに表示されます。

5. **関係図の生成**: Three.jsとReact.jsを使用して、ユーザーに対してエンティティ間の関係図を動的に描画します。この処理はクライアント側で行われ、TypeScriptを使用してロジックが記述されます。これにより、サーバーの負荷を軽減し、ユーザーエクスペリエンスを向上させます。

6. **マシンラーニングによる予測**: Amazon SageMakerを使用して、エンティティ間の新たな関係性を予測します。これらの予測はデータベースに保存され、ユーザーが検索したときに結果として表示されます。

7. **フィードバックと改善**: ユーザーからのフィードバックはDynamoDBに保存され、システムの改善に使用されます。また、新たにクロールされたデータは定期的にSpacyに送られ、エンティティと関係性の抽出が行われます。

8. **モニタリング**: Elasticsearchの動作はKibanaでモニタリングされ、問題が発生した場合にはすぐに対応できるようにします。

9. **共有**: ユーザーは検索結果をソーシャルメディアで共有することができます。これにより、アプリケーションの認知度を高めることができます。



## 🏷️完成ロードマップ: 

### 週1-週2: プロジェクト計画と準備

- プロジェクトの要件定義とスコープの洗い出し
- 技術スタックの確認とセットアップ
- 開発環境の構築とテスト
- プロジェクトのマイルストーンとタスクの定義

### 週3-週4: バックエンドの基本構造の開発

- データの収集と解析のためのAWS Lambda関数の開発
- SpacyとGINZAを使ったNLP機能の開発
- Neo4jとDynamoDBを使ったデータの保存と管理システムの開発
- Elasticsearchを使ったデータのインデックス化と検索機能の開発
- GraphQL APIの設計と開発

### 週5-週6: フロントエンドの基本構造の開発

-  Three.jsとReact.jsを使った可視化ツールの開発
- ユーザーインタフェースとエクスペリエンスの設計と開発
- サーバーからクライアントへのデータの結合と表示

### 週7-週8: マシンラーニングの開発と統合

- TensorFlowとKerasを用いた予測モデルの開発とトレーニング
- GPTを用いたテキスト生成の開発
- マシンラーニングモデルをバックエンドとフロントエンドに統合

### 週9: アプリケーションのテストと修正

- ユニットテスト、統合テスト、エンドツーエンドテストの実行
- バグ修正とパフォーマンスの最適化
- ユーザビリティテストの実施とフィードバックの収集

### 週10: デプロイメントとドキュメンテーション

- アプリケーションのデプロイとパフォーマンスの監視
- ドキュメンテーションの作成とアップデート
- 最終的なテストとフィードバックの収集

### 週11: フィードバックのレビューと最終的な調整
