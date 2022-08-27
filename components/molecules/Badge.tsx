import { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
};

/**
 * propsでhrefを渡すとLink付きのBadgeとなります。
 */
const Badge: NextPage<Props> = ({ children, href }) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a>
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
              {children}
            </div>
          </a>
        </Link>
      ) : (
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {children}
        </div>
      )}
    </>
  );
};

export default Badge;
