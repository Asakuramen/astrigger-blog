import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlightjs";
import markdownHtml from "zenn-markdown-html";

// ブログのメタデータ
export type BlogMetaData = {
  id: string;
  title: string;
  topics: string[];
  published_at: string;
  thumbnail: string;
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
 * ブログ記事(Markdown)のファイル名とメタデータを取り出す
 * @param startIndex 取得する記事の開始インデックス　最新（0）〜
 * @param num 取得する記事数
 */
export function getBlogsMetaData(startIndex: number, num: number) {
  const fileNames = fs.readdirSync(postsDirecrory); // パス配下のファイル群のファイル名を取得

  // 正常系
  if (startIndex < fileNames.length) {
    const allBlogsMetaData: BlogMetaData[] = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, ""); // ファイル名から拡張子を削除

      // mdファイルを文字列として読み取る
      const fullPath = path.join(postsDirecrory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const matterResult = matter(fileContents);

      // Markdown解析結果から必要な情報を抽出する
      const title: string = matterResult.data.title;
      const topics: string[] = matterResult.data.topics;
      const published_at: string = matterResult.data.published_at;
      const thumbnail: string = matterResult.data.thumbnail;

      // idとデータを返す
      return {
        id,
        title,
        topics,
        published_at,
        thumbnail,
      };
    });
    return allBlogsMetaData.slice(startIndex, startIndex + num);
  }
  // 異常系　指定インデックス範囲にブログ記事が１つもない場合はundefinedを返す
  else {
    return undefined;
  }
}

/**
 * 全てのブログ記事の総数を取得する
 */
export function getBlogsNumber() {
  const fileNames = fs.readdirSync(postsDirecrory); // パス配下のファイル群のファイル名を取得
  return fileNames.length;
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
  const topics: string[] = matterResult.data.topics;
  const published_at: string = matterResult.data.published_at;
  const thumbnail: string = matterResult.data.thumbnail;
  const blogContentHtml = markdownHtml(matterResult.content);

  return {
    id,
    title,
    topics,
    published_at,
    thumbnail,
    blogContentHtml,
  };
}
