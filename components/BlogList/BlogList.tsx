import { NextPage } from "next";
import Image from "next/image";
import { BlogMetaData } from "lib/getBlogContent";
import Link from "next/link";
import Badge from "components/UIparts/Badge";
import { getTagName } from "contents/tags";

type Props = {
  allBlogsMetaData: BlogMetaData[];
  showThumbnail?: boolean;
};

const BlogList: NextPage<Props> = ({ allBlogsMetaData, showThumbnail }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {allBlogsMetaData.length !== 0 ? (
        allBlogsMetaData.map((blogMetaData: BlogMetaData, index) => {
          return (
            <div
              className="bg-gray-50 rounded overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2"
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

                  <div className="p-3 sm:p-6">
                    <p className="text-gray-400 text-sm">{blogMetaData.published_at}</p>
                    <div className="font-bold text-xl mt-1 mb-1">
                      {blogMetaData.title}
                    </div>
                  </div>
                  <div className="pb-3 px-3 sm:px-6">
                    {blogMetaData.topics.map((topic) => {
                      return (
                        <div key={topic} className="inline-block">
                          <Badge>{getTagName(topic)}</Badge>
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
        <div className="text-gray-200 text-xl">
          指定条件を満たす記事は見つかりませんでした。
        </div>
      )}
    </div>
  );
};

export default BlogList;
