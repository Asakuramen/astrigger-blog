import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// ./postsフォルダへのパスを取得
const postsDirecrory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirecrory); // パス配下のファイル群のファイル名を取得
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // ファイル名から拡張子を削除

    // mdファイルを文字列として読み取る
    const fullPath = path.join(postsDirecrory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents); // メタデータを読み取り

    // idとデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirecrory); // パス配下のファイル群のファイル名を取得
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""), // [id].js  カギ括弧内の名称とparamsのキー名称は一致させる
      },
    };
  });
  /*
  [
    {
        params: {
            id: "ssg-ssr",
        }
    },
    {
        params: {
            id: "next-react,
        }
    }, ...
  ]
  */
}

// idに基づいて記事のデータを返す
export async function getPostData(id) {
  // 指定されたmdファイルの中身を取得する
  const fullPath = path.join(postsDirecrory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContent);

  // mdファイルの本文をHTMLに変換して取得する
  const blogContent = await remark().use(html).process(matterResult.content);
  const blogContentHtml = blogContent.toString();

  return {
    id,
    blogContentHtml,
    ...matterResult.data,
  };
}
