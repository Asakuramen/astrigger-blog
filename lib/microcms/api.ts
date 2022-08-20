import axios from "axios";
import { BlogMetaData } from "components/BlogList/BlogList";
import { BlogContent } from "pages/blogs/[id]";
import markdownToHtml from "zenn-markdown-html";

/**
 * Blog または Workの１つのContentの型
 */
export type Content = {
  contentType: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  thumbnail2?: string;
  body: string;
  id: string;
  publishedAt: string;
  revisedAt: string;
};

/**
 * microCMSから取得するContentの型
 */
interface ContentMicrocms {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  contentType: string[];
  title: string;
  tags: string[];
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  thumbnail2?: {
    url: string;
    height: number;
    width: number;
  };
  body: string;
}

/**
 * microCMSからコンテンツを取得する
 * @param contentType コンテンツの種類　Blog記事 | Work記事
 * @param limit コンテンツ取得数
 * @param tag 指定タグのコンテンツのみ取得する　"all"指定時は全てのコンテンツを取得する
 */
export async function getContentsByTag(contentType: string, limit: number, tag: string) {
  // tag = all の場合は全てのcontentを取得するため、microCMSのGET requestにfiltersを含めない
  let microcmsParams = {};
  if (tag === "all") {
    microcmsParams = {
      limit: limit,
      orders: "-revisedAt",
      filters: `contentType[contains]${contentType}`,
    };
  } else {
    microcmsParams = {
      limit: limit,
      orders: "-revisedAt",
      filters: `contentType[contains]${contentType}[and]tags[contains]${tag}`,
    };
  }

  // microCMSからデータ取得、10記事、更新日降順、特定タグを含む
  const res = await axios.get(process.env.MICROCMS_ENDPOINT_CONTENT!, {
    headers: { "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY! },
    params: microcmsParams,
  });
  const contents: ContentMicrocms[] = res.data.contents;

  // microCMSのデータを整形してコンポーネントに渡すPropsを作成する。
  const blogMetaDatas: BlogMetaData[] = contents.map((content) => {
    return {
      id: content.id,
      title: content.title,
      publishedAt: content.publishedAt.split("T")[0],
      revisedAt: content.revisedAt.split("T")[0],
      tags: content.tags,
      thumbnail: content.thumbnail.url,
    };
  });

  return blogMetaDatas;
}

/**
 * microCMSから特定のIDのコンテンツを１つ取得する
 * @param id microCMSで採番されたコンテンツのID
 */
export async function getContentById(id: string) {
  const microcmsParams = {
    ids: id,
  };

  // microCMSからデータ取得、10記事、更新日降順、特定タグを含む
  const res = await axios.get(process.env.MICROCMS_ENDPOINT_CONTENT!, {
    headers: { "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY! },
    params: microcmsParams,
  });
  const content: ContentMicrocms = res.data.contents[0];

  // microCMSのデータを整形してコンポーネントに渡すPropsを作成する。
  const blogContent: BlogContent = {
    id: content.id,
    title: content.title,
    // publishedAt: content.publishedAt.split("T")[0],
    // revisedAt: content.revisedAt.split("T")[0],
    publishedAt: content.publishedAt,
    revisedAt: content.revisedAt,
    tags: content.tags,
    thumbnail: content.thumbnail.url,
    body: markdownToHtml(content.body), // markdownをHTML(string)に変換する
  };

  return blogContent;
}

/**
 * microCMSから全てのコンテンツのIDを取得する
 * @param contentType コンテンツの種類　Blog記事 | Work記事
 */
export async function getContentsIds(contentType: string) {
  const microcmsParams = {
    filters: `contentType[contains]${contentType}`,
    fields: "id",
  };
  // microCMSからデータ取得、10記事、更新日降順、特定タグを含む
  const res = await axios.get(process.env.MICROCMS_ENDPOINT_CONTENT!, {
    headers: { "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY! },
    params: microcmsParams,
  });
  const contents: ContentMicrocms[] = res.data.contents;

  const contentIds: { id: string }[] = contents;

  return contentIds;
}
