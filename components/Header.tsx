import Link from "next/link";
import React from "react";

type Props = {
  pageKind: "home" | "blogs" | "aboutme" | "works" | "contact";
};

const Header: React.FC<Props> = (props) => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3 shadow-md">
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/blogs">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
              Blog
            </a>
          </Link>
          <Link href="/aboutme">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
              About me
            </a>
          </Link>
          <Link href="/works">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
              Works
            </a>
          </Link>
        </div>
        <div>
          <Link href="/contact">
            <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
              Contact
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
