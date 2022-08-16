import path from "path";
import fs from "fs";
import matter from "gray-matter";
import markdownHtml from "zenn-markdown-html";

// 1ページに表示する記事数を定義
const CONTENTS_NUMBER_PER_PAGE = 4;
// Markdownを格納するフォルダへのパスを取得
const directoryBlogs = path.join(process.cwd(), "contents/blogs");
//

/**
 * 全てのMarkdownのファイル名を取得する
 * getStaticPathsの戻り値の形式に整形して返す
 */
export function getAllBlogsId() {
  const fileNames = fs.readdirSync(directoryBlogs); // パス配下のファイル群のファイル名を取得
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""), // ファイル名から".md"を削除
      },
    };
  });
}

/**
 * Blogコンテンツ
 */
export type BlogMetaData = {
  id: string;
  title: string;
  topics: string[];
  published_at: string;
  thumbnail: string;
};

/**
 * 指定のtagを持つブログ記事(Markdown)のメタデータを取得する
 * @param tag ブログ記事のtag名
 */
export function getBlogMetaDatasByTag(tag: string) {
  // 全てのmarkdownのメタデータを取得
  const fileNames = fs.readdirSync(directoryBlogs);
  let allBlogMetaDatas: BlogMetaData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // ファイル名から拡張子を削除

    // mdファイルを文字列として読み取る
    const fullPath = path.join(directoryBlogs, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);

    // Markdown解析結果から必要な情報を抽出する
    const title: string = matterResult.data.title;
    const topics: string[] = matterResult.data.topics;
    const published_at: string = matterResult.data.published_at;
    const thumbnail: string = matterResult.data.thumbnail;

    return {
      id,
      title,
      topics,
      published_at,
      thumbnail,
    };
  });

  // 指定したtag名と同じtagを持つmarkdownのみ抽出する
  // ただしtag名がallの場合は全てのmarkdownを返す
  let filterdAllBlogMetaDatas: BlogMetaData[] | undefined;
  if (tag === "all") {
    filterdAllBlogMetaDatas = Array.from(allBlogMetaDatas);
  } else {
    filterdAllBlogMetaDatas = allBlogMetaDatas.filter((blogMetaData: BlogMetaData) => {
      return blogMetaData.topics.includes(tag);
    });
  }

  // 正常系　published_atの降順でmarkdownをソートする
  if (filterdAllBlogMetaDatas) {
    filterdAllBlogMetaDatas = filterdAllBlogMetaDatas.sort((a, b) => {
      return a.published_at > b.published_at ? -1 : 1;
    });
    return filterdAllBlogMetaDatas;
  }
  // 異常系　指定したtag名のmarkdownが１つも存在しなかった場合、空配列を返す
  else {
    return [];
  }
}

/**
 * Markdownのメタデータおよび本文を取得する
 * @param startIndex 取得するファイルの開始インデックス　最新（0）〜
 * @param num 取得するファイル数
 * @param num topicによるコンテンツのいフィルタ
 */
export function getBlogsMetaData(startIndex: number, num: number) {
  const fileNames = fs.readdirSync(directoryBlogs); // パス配下のファイル群のファイル名を取得

  // 正常系
  if (startIndex < fileNames.length) {
    const allBlogsMetaData: BlogMetaData[] = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, ""); // ファイル名から拡張子を削除

      // mdファイルを文字列として読み取る
      const fullPath = path.join(directoryBlogs, fileName);
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
  // 異常系　指定インデックス範囲にコンテンツがが１つもない場合はundefinedを返す
  else {
    console.error("指定インデックス範囲にコンテンツが１つも見つかりません");
    return [];
  }
}

/**
 * 全てのブログ記事の総数を取得する
 */
export function getBlogsNumber() {
  const fileNames = fs.readdirSync(directoryBlogs); // パス配下のファイル群のファイル名を取得
  return fileNames.length;
}

/**
 * 指定ファイル名のブログ記事(Markdown)のメタデータ、およびHTMLに変換した本文を返す
 */
export async function getBlogContentData(id: string) {
  const fullpath = path.join(directoryBlogs, `${id}.md`);
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
