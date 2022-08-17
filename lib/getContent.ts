import path from "path";
import fs from "fs";
import matter from "gray-matter";
import markdownHtml from "zenn-markdown-html";

/**
 * コンテンツメタデータ(PrivacyPolicy)
 */
export type PrivacyPolicyContentMetadata = {
  filename: string;
};

/**
 * コンテンツ本文
 */
type ContentBodyHtml = {
  bodyHtml: string;
};

/**
 * コンテンツ(PrivacyPolicy)
 */
export type PrivacyPolicyContent = PrivacyPolicyContentMetadata & ContentBodyHtml;

/**
 * 指定ファイル名のworkコンテンツ(Markdown)のメタデータ、およびHTMLに変換した本文を返す
 */
export async function getContent(filename: string): Promise<PrivacyPolicyContent> {
  const fullpath = path.join(filename);
  const fileContent = fs.readFileSync(fullpath, "utf-8");
  const matterResult = matter(fileContent);

  // Markdown解析結果から必要な情報を抽出する
  const bodyHtml = markdownHtml(matterResult.content);

  return {
    filename,
    bodyHtml,
  };
}
