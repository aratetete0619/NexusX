# ベースとなるイメージを指定
FROM python:3.9

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# 環境変数を設定
# Pythonがstdoutをバッファリングしないようにする
ENV PYTHONUNBUFFERED=1

# requirements.txtをコピー
COPY requirements.txt ./

# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# すべてのローカルファイルをコピー
COPY . .

# デフォルトのコマンドを指定
CMD ["python", "./backend/app/main.py"]
