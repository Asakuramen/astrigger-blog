export const tagList = [
  { name: "Next.js", path: "next.js" },
  { name: "React", path: "react" },
  { name: "Typescript", path: "typescript" },
  { name: "Tailwind", path: "tailwind" },
  { name: "CSS", path: "css" },
  { name: "jquery", path: "jquery" },
  { name: "Node.js", path: "node.js" },
  { name: "Python", path: "python" },
  { name: "セキュリティ", path: "security" },
  { name: "Raspberrypi", path: "raspberrypi" },
  { name: "3DPrinter", path: "3dprinter" },
  { name: "デジタルアナログ回路", path: "curcuit" },
  { name: "すべての記事", path: "all" },
];

/**
 * tagのpathを表示名称に変換する
 */
export const getTagName = (path: string) => {
  const findTag = tagList.find((tag) => tag.path === path);

  if (findTag) {
    return findTag.name;
  } else {
    return "";
  }
};
