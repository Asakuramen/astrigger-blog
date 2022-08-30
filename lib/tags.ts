export const tagList = [
  { name: "Next.js", path: "nextjs", category: "frontend" },
  { name: "React", path: "react", category: "frontend" },
  { name: "Javascript", path: "javascript", category: "frontend" },
  { name: "Typescript", path: "typescript", category: "frontend" },
  { name: "CSS", path: "css", category: "frontend" },
  { name: "Tailwindcss", path: "tailwindcss", category: "frontend" },
  { name: "Firebase", path: "firebase", category: "cloud" },
  { name: "AWS", path: "aws", category: "cloud" },
  { name: "Node.js", path: "nodejs", category: "backend" },
  { name: "Python", path: "python", category: "backend" },
  { name: "3Dプリンタ", path: "3dprinter", category: "hardware" },
  { name: "デジタルアナログ回路", path: "analogdigitalcircuit", category: "hardware" },
  { name: "Raspberrypi", path: "raspberrypi", category: "hardware" },
  { name: "セキュリティ", path: "security", category: "other" },
  { name: "買ってよかったもの", path: "goods", category: "everyday" },
  { name: "全ての記事", path: "all", category: "none" },
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

/**
 * 指定カテゴリーを持つtagの表示名称を返す
 */
export const getTagIcon = (category: string) => {
  const findTag = tagList.find((tag) => tag.category === category);

  if (findTag) {
    return findTag;
  } else {
    return;
  }
};
