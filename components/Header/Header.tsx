import Link from "next/link";
import React from "react";

type Props = {
  pageKind: "top" | "blog" | "works" | "contact" | "shop";
  stickey: boolean;
};

const Header: React.FC<Props> = (props) => {
  return (
    <nav className={props.stickey ? "bg-gray-800 sticky top-0 z-10" : "bg-gray-800"}>
      <div className="container px-6 py-2 mx-auto flex justify-between items-center">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <a className="text-2xl font-bold transition-colors duration-200 transform text-white lg:text-3xl hover:text-gray-300">
                A
              </a>
            </Link>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden items-center sm:flex">
          <div className="flex flex-row mx-6">
            <Link href="/">
              <a className="mx-4 text-sm transform transition-colors duration-200 text-gray-200 border-b-2 border-transparent hover:border-blue-500">
                Top
              </a>
            </Link>
            <Link href="/blogs">
              <a className="mx-4 text-sm transform transition-colors duration-200 text-gray-200  border-b-2 border-transparent hover:border-blue-500">
                Blog
              </a>
            </Link>
            <Link href="/works">
              <a className="mx-4 text-sm transform transition-colors duration-200 text-gray-200 border-b-2 border-transparent hover:border-blue-500">
                Works
              </a>
            </Link>
            <Link href="/contact">
              <a className="mx-4 text-sm transform transition-colors duration-200 text-gray-200 border-b-2 border-transparent hover:border-blue-500">
                Contact
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
