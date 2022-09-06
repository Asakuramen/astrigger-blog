import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Badge from "components/molecules/Badge";
import { getTagName } from "lib/tags";

/**
 * Blogのメタデータの型　Blog一覧表示のコンポーネントで使用
 */
export interface BlogMetaData {
  id: string;
  title: string;
  tags: string[];
  publishedAt: string;
  revisedAt: string;
  thumbnail: string;
}

type Props = {
  blogMetaDatas: BlogMetaData[];
  showThumbnail?: boolean;
};

const BlogList: NextPage<Props> = ({ blogMetaDatas, showThumbnail }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogMetaDatas.length !== 0 ? (
        blogMetaDatas.map((blogMetaData: BlogMetaData, index) => {
          return (
            <div
              className="bg-white overflow-hidden shadow-md rounded-xl hover:shadow-xl transition duration-200 hover:-translate-y-1"
              key={blogMetaData.id}
            >
              <Link href={`/blogs/${blogMetaData.id}`}>
                <a>
                  {showThumbnail && (
                    <div className="relative w-full aspect-video">
                      <Image
                        className="w-full"
                        src={blogMetaData.thumbnail}
                        alt="thumbnail"
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                      />
                    </div>
                  )}

                  <div className="p-3 sm:p-6 border-t-2 border-gray-200">
                    <p className="text-gray-400 text-sm">{blogMetaData.revisedAt}</p>
                    <div className="font-bold text-xl mt-1 mb-1">
                      {blogMetaData.title}
                    </div>
                  </div>
                  <div className="pb-3 px-3 sm:px-6">
                    {blogMetaData.tags.map((tag) => {
                      return (
                        <div key={tag} className="inline-block">
                          <Badge>{getTagName(tag)}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </a>
              </Link>
            </div>
          );
        })
      ) : (
        <div className="text-gray-500 text-xl">
          指定条件を満たす記事は見つかりませんでした。
        </div>
      )}
    </div>
  );
};

export default BlogList;
