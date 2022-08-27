# コンテンツ内容

個人向けの WEB サイトを制作しました、こちらで公開しています。

https://astrigger-blog.vercel.app/

WEB サイトで配信するコンテンツは以下の通りです。
全ページでレスポンシブデザインに対応しています。

- Top ページ　
  WEB サイトの表紙と自己紹介のページです。

  自身の提供するサービス・スキルやポートフォリオを紹介しています。

- Blog ページ　
  ブログ記事を配信するページです。ブログ記事は Markdown で記述し、ビルド時に HTML へ自動変換して表示しします。一般的な Markdown の記法に加えて、情報共有コミュニティサイト`Zenn`で利用できる拡張記法にも対応しています。
  https://zenn.dev/zenn/articles/markdown-guide

  また、コメントの投稿・閲覧機能を実装しています。

- Works ページ　
  これまでの仕事内容やポートフォリオを公開するページです。 こちらも Blog ページ と同様に Markdown で記述して作品の情報を公開します。

- Contact ページ　
  問い合わせ内容をサイト運営者に送信するページです。

# 技術スタック

## フロントエンド

- フレームワーク
  Next.js(React)を使用しています。
  公開するコンテンツの特性により以下のレンダリング方法を使い分け、本サイトのレスポンス向上を図っています。
  また、Typescript を導入して開発を行っています。

  - CSR (Client Side Rendering)
  - SSG (Statc Site Generation)
  - SSR (Server Side Rendering)

- CSS フレームワーク
  Tailwindcss を使用しています。

## バックエンド

- コンテンツ管理
  ブログ記事、コメントなどの各種コンテンツは、ヘッドレス CMS サービスの`microCMS`にて管理しています。

- bot 対策
  コメント投稿や問い合わせ送信については、bot による不正アクセス防止の為 Google reCPATCHA(v3)による保護機能を実装しています。
  Google サーバーとの認証処理は Next.js の API Routes 機能によりバックエンド側で処理を行い、秘密鍵を秘匿しています。
