export const tagList = [
  { name: "Next.js", path: "nextjs" },
  { name: "React", path: "react" },
  { name: "Javascript", path: "javascript" },
  { name: "Typescript", path: "typescript" },
  { name: "CSS", path: "css" },
  { name: "Tailwindcss", path: "tailwindcss" },
  { name: "Firebase", path: "firebase" },
  { name: "AWS", path: "aws" },
  { name: "microCMS", path: "microcms" },
  { name: "Node.js", path: "nodejs" },
  { name: "Python", path: "python" },
  { name: "3DPrinter", path: "3dprinter" },
  { name: "デジタルアナログ回路", path: "analogdigitalcircuit" },
  { name: "Raspberrypi", path: "raspberrypi" },
  { name: "セキュリティ", path: "security" },
  { name: "Git", path: "git" },
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
