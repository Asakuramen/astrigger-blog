import { DiReact } from "react-icons/di";

export const tagList = [
  { name: "Next.js", path: "nextjs", icon: DiReact },
  { name: "React", path: "react", icon: DiReact },
  { name: "Javascript", path: "javascript", icon: DiReact },
  { name: "Typescript", path: "typescript", icon: DiReact },
  { name: "CSS", path: "css", icon: DiReact },
  { name: "Tailwindcss", path: "tailwindcss", icon: DiReact },
  { name: "Firebase", path: "firebase", icon: DiReact },
  { name: "AWS", path: "aws", icon: DiReact },
  { name: "Node.js", path: "nodejs", icon: DiReact },
  { name: "Python", path: "python", icon: DiReact },
  { name: "3Dプリンタ", path: "3dprinter", icon: DiReact },
  { name: "デジタルアナログ回路", path: "analogdigitalcircuit", icon: DiReact },
  { name: "Raspberrypi", path: "raspberrypi", icon: DiReact },
  { name: "セキュリティ", path: "security", icon: DiReact },
  { name: "全ての記事", path: "all", icon: DiReact },
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
 * tagのpathをアイコンコンポーネントに変換する
 */
export const getTagIcon = (path: string) => {
  const findIcon = tagList.find((tag) => tag.path === path);

  if (findIcon) {
    return findIcon.icon;
  } else {
    return;
  }
};
