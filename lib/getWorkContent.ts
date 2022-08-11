import path from "path";
import fs from "fs";
import matter from "gray-matter";
import markdownHtml from "zenn-markdown-html";
import { JSDOM } from "jsdom";

/**
 * Workコンテンツ（メタデータのみ）
 */
export type WorkContentMetadata = {
  id: string;
  title: string;
  description: string;
  topics: string[];
  published_at: string;
  thumbnail: string[];
};

/**
 * Workコンテンツ(本文のみ)
 */
type WorkContentBodyHtml = {
  bodyHtml: string;
};

/**
 * Workコンテンツ
 */
export type WorkContent = WorkContentMetadata & WorkContentBodyHtml;

// Markdownを格納するフォルダへのパスを取得
const directoryWorks = path.join(process.cwd(), "contents/works");

/**
 * 全てのMarkdownのファイル名を取得する
 * getStaticPathsの戻り値の形式に整形して返す
 */
export function getWorksContentId() {
  const fileNames = fs.readdirSync(directoryWorks); // パス配下のファイル群のファイル名を取得
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""), // ファイル名から".md"を削除
      },
    };
  });
}

/**
 * worksコンテンツMarkdownのメタデータおよび本文を取得する
 * @param startIndex 取得するファイルの開始インデックス　最新（0）〜
 * @param num 取得するファイル数
 */
export function getWorksMetaData(startIndex: number, num: number) {
  const fileNames = fs.readdirSync(directoryWorks); // パス配下のファイル群のファイル名を取得

  // 正常系
  if (startIndex < fileNames.length) {
    const allContent: WorkContentMetadata[] = fileNames.map((fileName) => {
      // mdファイルを文字列として読み取る
      const fullPath = path.join(directoryWorks, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const matterResult = matter(fileContents);

      // Markdown解析結果から必要な情報を抽出する
      const id = fileName.replace(/\.md$/, "");
      const title: string = matterResult.data.title;
      const description: string = matterResult.data.description;
      const topics: string[] = matterResult.data.topics;
      const published_at: string = matterResult.data.published_at;
      const thumbnail: string[] = matterResult.data.thumbnail;

      // idとデータを返す
      return {
        id,
        title,
        description,
        topics,
        published_at,
        thumbnail,
      };
    });
    return allContent.slice(startIndex, startIndex + num);
  }
  // 異常系　指定インデックス範囲にファイルが１つもない場合はundefinedを返す
  else {
    console.error("指定インデックス範囲にファイルが１つも見つかりません");
    return undefined;
  }
}

/**
 * 指定ファイル名のworkコンテンツ(Markdown)のメタデータ、およびHTMLに変換した本文を返す
 */
export async function getWorkContent(id: string): Promise<WorkContent> {
  const fullpath = path.join(directoryWorks, `${id}.md`);
  const fileContent = fs.readFileSync(fullpath, "utf-8");
  const matterResult = matter(fileContent);

  // Markdown解析結果から必要な情報を抽出する
  // Markdown解析結果から必要な情報を抽出する
  const title: string = matterResult.data.title;
  const description: string = matterResult.data.description;
  const topics: string[] = matterResult.data.topics;
  const published_at: string = matterResult.data.published_at;
  const thumbnail: string[] = matterResult.data.thumbnail;
  const bodyHtml = markdownHtml(matterResult.content);

  return {
    id,
    title,
    description,
    topics,
    published_at,
    thumbnail,
    bodyHtml,
  };
}
