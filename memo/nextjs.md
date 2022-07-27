# Next.js

# 環境構築

```
npx create-next-app
```

インストール完了後以下コマンドを実行し、  
ブラウザで http://localhost:3000 にアクセス

```
npm run dev
```

# Next.js の雛形

create-next-app で生成される各ファイルの役割  
基本的には、pages, publc, styles, の３つのファイルを開発者が編集する

- .next フォルダ  
  基本触らない
- pages フォルダ  
  新たに js ファイルを作成すると、そのファイル名の頭文字が URL に相当し、ブラウザからアクセスできるようになる  
  index.js はルートディレクトリにアクセス時に表示される
- public フォルダ  
  静的なファイルが格納される。画像など。
- styles フォルダ  
  css ファイルが格納される
- eslintrc.json  
  コードの静的検証ツール（Eslint)の設定ファイル、触る必要はない。
- .gitignore
  push から除外するフォルダ・ファイルを指定する  
  node_modules や.next フォルダなどは git リポジトリにアップロードする必要はないため除外する
- next.config.js
  next.js に関わる設定ファイル、特に触らない
- package.json
  スクリプトをや外部からインストールしたライブラリを管理するファイル
- yarn.lock
  package.json で記載されたモジュールのバージョンを固定するためのファイル

# 絶対パスでモジュールをインポートする方法

[参考ページ]<https://fwywd.com/tech/next-base-url>

import する際に絶対パス基準にすると、パスの位置関係を気にする必要がなくなり開発が捗る  
tsconfig.json に baseUrl を設定する。"."でルートディレクトリが基準となる

```javascript
{
  "compilerOptions": {
    "baseUrl": "."
  },
}
```
