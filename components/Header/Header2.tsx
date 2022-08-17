import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoFish } from "react-icons/io5";

type Props = {
  sticky: boolean;
};

const Header2: React.FC<Props> = ({ sticky }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // sm以下で表示するハンバーガーメニューのトグル動作
  const toggleHumbergerMenu = () => {
    setIsMenuOpen((prevState) => {
      const elementHeaderMenu = document.getElementById("header-humbergermenu")!;
      // オープン時
      if (prevState) {
        elementHeaderMenu.classList.remove("animate-fade-in");
        elementHeaderMenu.classList.add("animate-fade-out-top");
      }
      // クローズ時
      else {
        elementHeaderMenu.classList.remove("animate-fade-out-top", "invisible");
        elementHeaderMenu.classList.add("animate-fade-in");
      }
      return !prevState;
    });
  };

  return (
    <nav
      className={`h-12 mx-auto flex items-center z-10 bg-gray-800 shadow-sm ${
        sticky && "sticky top-0"
      }`}
    >
      <div className="flex flex-row items-center w-full">
        <div className="ml-8">
          <Link href="/">
            <a className="text-lg font-bold transition-colors transform text-white lg:text-xl hover:text-gray-300">
              <div className="flex flex-row items-center">
                <IoFish />
                <div className="mx-2">Gourami Engineering</div>
              </div>
            </a>
          </Link>
        </div>
      </div>

      <div className="hidden sm:flex items-center h-full">
        <div className="mx-4 px-2 text-sm transform transition-colors text-gray-200 border-b-2 border-transparent hover:border-blue-500">
          <Link href="/#top-aboutme">
            <a>About</a>
          </Link>
        </div>
        <div className="mx-4 px-2 text-sm transform transition-colors text-gray-200 border-b-2 border-transparent hover:border-blue-500">
          <Link href="/blogs/all/1">
            <a>Blog</a>
          </Link>
        </div>
        <div className="mx-4 px-2 text-sm transform transition-colors text-gray-200 border-b-2 border-transparent hover:border-blue-500">
          <Link href="/works">
            <a>Works</a>
          </Link>
        </div>
        <div className="mx-4 px-2 text-sm transform transition-colors text-gray-200 border-b-2 border-transparent hover:border-blue-500">
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </div>
      </div>

      <div className="flex items-center sm:hidden mr-3 ml-auto ">
        <button
          type="button"
          className="my-auto text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          aria-label="toggle menu"
          onClick={toggleHumbergerMenu}
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
            <path
              fillRule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            ></path>
          </svg>
        </button>
      </div>

      <div
        id="header-humbergermenu"
        className="absolute invisible w-full top-12 z-10 bg-gray-800 "
      >
        <div className="flex flex-col ">
          <Link href="/#top-aboutme">
            <a className="px-8 py-8 text-sm  text-gray-200 border-y border-gray-600 transition-colors transform duration-200  hover:bg-gray-600">
              About
            </a>
          </Link>
          <Link href="/blogs">
            <a className="px-8 py-8 text-sm  text-gray-200 border-y border-gray-600 transition-colors transform duration-200  hover:bg-gray-600">
              Blog
            </a>
          </Link>
          <Link href="/works">
            <a className="px-8 py-8 text-sm  text-gray-200 border-y border-gray-600 transition-colors transform duration-200  hover:bg-gray-600">
              Works
            </a>
          </Link>
          <Link href="/contact">
            <a className="px-8 py-8 text-sm  text-gray-200 border-y border-gray-600 transition-colors transform duration-200  hover:bg-gray-600">
              Contact
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header2;
