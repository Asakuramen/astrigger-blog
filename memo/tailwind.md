# Tailwind.css 📝

## インストール

Next.js フレームワークで Tailwindcss を利用する方法

[インストール&実行方法](https://tailwindcss.com/docs/guides/nextjs)

[Next.js 用の追加設定](https://tailwindcss.com/docs/guides/nextjs)

## 注意点

- vscode の settings.json に次を追記することで、globals.css のエラーを非表示にできる

```
"css.lint.unknownAtRules": "ignore"
```

- TailwindCLI のビルドのコマンドは Next.js では不要

- WEB サイト等から Tailwind のサンプルをコピーする場合は、  
  "class" を "className" に置換する必要がある
  react の仕様でクラスの適用は className に記述する必要があるため
