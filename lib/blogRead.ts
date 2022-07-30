import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// ブログのメタデータ
export type BlogMetaData = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  tags: string[];
};

// ./contents/blogフォルダへのパスを取得
const postsDirecrory = path.join(process.cwd(), "contents/blog");

// mdファイルのデータを取り出す
export function getBlogsMetaData() {
  const fileNames = fs.readdirSync(postsDirecrory); // パス配下のファイル群のファイル名を取得
  const allBlogsMetaData: BlogMetaData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // ファイル名から拡張子を削除

    // mdファイルを文字列として読み取る
    const fullPath = path.join(postsDirecrory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents); // メタデータを読み取り

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
