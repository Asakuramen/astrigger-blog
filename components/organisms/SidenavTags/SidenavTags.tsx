import Badge from "components/molecules/Badge";
import { NextPage } from "next";
import { tagList } from "lib/tags";

const SidenavTags: NextPage = () => {
  tagList;

  return (
    <>
      <div className="shadow-sm rounded-xl bg-white ">
        <h1 className="pt-4 pl-4 pb-2 border-b text-xl text-sky-900">カテゴリー</h1>
        <div className="p-4">
          {tagList.map((tag) => {
            return (
              <div key={tag.name} className="inline-block">
                <Badge href={`/blogs/${tag.path}/1`}>{tag.name}</Badge>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SidenavTags;
