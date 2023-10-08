# ベースとなるイメージを指定
FROM python:3.9

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# 環境変数を設定
# Pythonがstdoutをバッファリングしないようにする
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH /usr/src/app

RUN pip install --upgrade setuptools

# poetryをインストール
RUN pip install poetry

# pyproject.tomlとpoetry.lockをコピー
COPY pyproject.toml poetry.lock ./

# 依存関係をインストール
RUN poetry config virtualenvs.create false \
  && poetry install

# すべてのローカルファイルをコピー
COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
