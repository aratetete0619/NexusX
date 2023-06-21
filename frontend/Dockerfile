# ベースとなるイメージを指定。Node.jsのLTS版を使用
FROM node:14

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# 環境変数を設定（ポート番号とパス）
ENV PORT 3000
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm cache clean --force
RUN npm install --silent
RUN ls -la /usr/src/app/node_modules


# node_modulesディレクトリを作成
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

# ユーザをnodeに切り替える
USER node

# 全てのローカルファイルをコピー
COPY --chown=node:node . .

# アプリケーションをスタート
CMD ["npm", "start"]
