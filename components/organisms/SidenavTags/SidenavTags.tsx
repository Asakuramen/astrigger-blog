import Badge from "components/molecules/Badge";
import { NextPage } from "next";
import { tagList } from "lib/tags";

const SidenavTags: NextPage = () => {
  tagList;

  return (
    <>
      <h1 className="pb-4 text-xl text-sky-900">カテゴリー</h1>
      {tagList.map((tag) => {
        return (
          <div key={tag.name} className="inline-block">
            <Badge href={`/blogs/${tag.path}/1`}>{tag.name}</Badge>
          </div>
        );
      })}
    </>
  );
};

export default SidenavTags;
