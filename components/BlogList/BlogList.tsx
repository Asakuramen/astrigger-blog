import { NextPage } from "next";
import Image from "next/image";
import { BlogMetaData } from "lib/blogRead";
import Link from "next/link";

type Props = {
  allBlogsMetaData: BlogMetaData[] | undefined;
};

const BlogList: NextPage<Props> = ({ allBlogsMetaData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {allBlogsMetaData ? (
        allBlogsMetaData.map((blogMetaData: BlogMetaData) => {
          return (
            <div
              className="rounded overflow-hidden shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-2"
              key={blogMetaData.id}
            >
              <Link href={`/blogs/${blogMetaData.id}`}>
                <a>
                  <Image
                    className="w-full"
                    src={blogMetaData.thumbnail}
                    alt="thumbnail"
                    layout={"responsive"}
                    width="200px"
                    height="100px"
                  />
                  <div className="px-6 py-4">
                    <p className="text-gray-400 text-base">{blogMetaData.published_at}</p>
                    <div className="font-bold text-xl mt-1 mb-1">
                      {blogMetaData.title}
                    </div>
                  </div>
                  <div className="px-6 pt-2 pb-2">
                    {blogMetaData.topics.map((topics) => {
                      return (
                        <span
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                          key={topics}
                        >
                          {`#${topics}`}
                        </span>
                      );
                    })}
                  </div>
                </a>
              </Link>
            </div>
          );
        })
      ) : (
        <div>Internal Server Error! Article is not found</div>
      )}
    </div>
  );
};

export default BlogList;
