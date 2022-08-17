import Badge from "components/UIparts/Badge";
import { NextPage } from "next";
import { tagList } from "contents/tags";

const SidenavTags: NextPage = () => {
  tagList;

  return (
    <>
      <h1 className="text-lx pb-4">カテゴリー</h1>
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
