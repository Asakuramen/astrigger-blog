import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogMetaData } from "../BlogList/BlogList";

interface Props {
  blogMetaDatas: BlogMetaData[];
}

const RecentContent = (props: Props) => {
  const { blogMetaDatas } = props;

  return (
    <>
      <div className="shadow-sm rounded-xl bg-white ">
        <h1 className="pl-4 pt-4 pb-2 border-b text-xl text-sky-900">最近の記事</h1>
        <div className="flex flex-col w-full">
          {blogMetaDatas.map((blogMetaData) => {
            return (
              <div key={blogMetaData.id}>
                <Link href={`/blogs/${blogMetaData.id}`}>
                  <a>
                    <div className="flex  py-2 border-b transition duration-200 hover:text-sky-900 hover:bg-gray-100">
                      <div className="p-2">
                        <div className="relative aspect-video w-24 ">
                          <Image
                            className="w-full"
                            src={blogMetaData.thumbnail}
                            alt="thumbnail"
                            layout="fill"
                            objectFit="cover"
                            priority={true}
                          />
                        </div>
                      </div>

                      <div className="mx-2">
                        <p className="mb-1 text-xs text-gray-500">
                          {blogMetaData.revisedAt}
                        </p>
                        <p className="text-xs">{blogMetaData.title}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecentContent;
