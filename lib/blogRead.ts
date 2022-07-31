import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlightjs";

// ブログのメタデータ
export type BlogMetaData = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  tags: string[];
};

// ブログ記事(Markdown)を格納するフォルダへのパスを取得
const postsDirecrory = path.join(process.cwd(), "contents/blogs");

/**
 * 全ての記事ファイル(Markdown)のファイル名を取得する
 */
export function getAllBlogsId() {
  const fileNames = fs.readdirSync(postsDirecrory); // パス配下のファイル群のファイル名を取得
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""), // ファイル名から".md"を削除
      },
    };
  });
}

/**
 * 全てのブログ記事(Markdown)のファイル名とメタデータを取り出す
 */
export function getBlogsMetaData() {
  const fileNames = fs.readdirSync(postsDirecrory); // パス配下のファイル群のファイル名を取得
  const allBlogsMetaData: BlogMetaData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // ファイル名から拡張子を削除

    // mdファイルを文字列として読み取る
    const fullPath = path.join(postsDirecrory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);

    // Markdown解析結果から必要な情報を抽出する
    const title: string = matterResult.data.title;
    const date: string = matterResult.data.date;
    const thumbnail: string = matterResult.data.thumbnail;
    const tags: string[] = matterResult.data.tag.split(",");

    // idとデータを返す
    return {
      id,
      title,
      date,
      thumbnail,
      tags,
    };
  });
  return allBlogsMetaData;
}

/**
 * 指定ファイル名のブログ記事(Markdown)のメタデータ、およびHTMLに変換した本文を返す
 */
export async function getBlogContentData(id: string) {
  const fullpath = path.join(postsDirecrory, `${id}.md`);
  const fileContent = fs.readFileSync(fullpath, "utf-8");
  const matterResult = matter(fileContent);

  // Markdown解析結果から必要な情報を抽出する
  const title: string = matterResult.data.title;
  const date: string = matterResult.data.date;
  const thumbnail: string = matterResult.data.thumbnail;
  const tags: string[] = matterResult.data.tag.split(",");

  // 記事本文(matterResult.content)を解析してHTMLに変換する

  // remark.jsのパース処理を一部カスタマイズする

  const renderer = new marked.Renderer();

  renderer.code = function (code, language) {
    return (
      `<span class="code-title">${language}</span>` +
      "<pre" +
      '><code class="hljs">' +
      hljs.highlightAuto(code).value +
      "</code></pre>"
    );
  };

  renderer.codespan = function (text) {
    return `<code class="codespan">${text}</code>`;
  };

  marked.setOptions({
    langPrefix: "",
    breaks: true,
    renderer: renderer,
    headerPrefix: "",
    gfm: true,
  });

  const blogContent = marked.parse(matterResult.content);

  const blogContentHtml = blogContent.toString();

  return {
    id,
    title,
    date,
    thumbnail,
    tags,
    blogContentHtml,
  };
}
