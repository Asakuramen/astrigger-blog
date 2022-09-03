import Link from "next/link";
import { IoFish } from "react-icons/io5";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { SiZenn } from "react-icons/si";
import { FiAlertTriangle } from "react-icons/fi";

const Footer = () => {
  return (
    <nav className={"h-80 sm:h-52 bg-gradient-to-tl from-sky-900 to-sky-800"}>
      <div className="max-w-screen-lg mx-auto">
        <div className="pt-8 flex flex-col sm:flex-row w-full ">
          <div className="mx-auto sm:ml-12">
            <div className="mb-6 sm:mb-2">
              <Link href="/">
                <a>
                  <div className="flex flex-row items-center text-2xl font-bold transition-colors transform text-white hover:text-gray-400">
                    <span>Gourami Engineering &nbsp;</span>
                    <IoFish />
                  </div>
                </a>
              </Link>
            </div>
            <p className="hidden sm:block text-xs text-gray-200">Thanks for reading!</p>
            <p className="hidden sm:block pt-16 text-xs text-gray-200">
              © 2022-present Gourami Enginnering.
            </p>
          </div>

          <div className="flex mx-auto sm:mx-0 mb-4">
            <div className="flex flex-col w-36">
              <div className="py-1 text-sm text-gray-400">
                <p>Content</p>
              </div>
              <div className="py-1 text-sm transform transition-colors text-gray-200 hover:text-gray-400">
                <Link href="/#top-aboutme">
                  <a>About</a>
                </Link>
              </div>
              <div className="py-1 text-sm transform transition-colors text-gray-200 hover:text-gray-400">
                <Link href="/blogs/all/1">
                  <a>Blog</a>
                </Link>
              </div>
              <div className="py-1 text-sm transform transition-colors text-gray-200 hover:text-gray-400">
                <Link href="/works/all/1">
                  <a>Works</a>
                </Link>
              </div>
              <div className="py-1 text-sm transform transition-colors text-gray-200 hover:text-gray-400">
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </div>
            </div>

            <div className="flex flex-col w-36">
              <div className="py-1 text-sm text-gray-400">
                <p>Links</p>
              </div>

              <Link href="https://twitter.com/asakuramen_17">
                <div className="flex items-center py-1 text-sm transform transition-colors text-gray-200 hover:text-gray-400">
                  <BsTwitter />
                  <a>&nbsp; Twitter</a>
                </div>
              </Link>

              <Link href="https://github.com/TAPStar">
                <div className="flex items-center py-1 text-sm transform transition-colors text-gray-200 hover:text-gray-400">
                  <BsGithub />
                  <a>&nbsp; Github</a>
                </div>
              </Link>
              <Link href="https://zenn.dev/angelecho">
                <div className="flex items-center py-1 text-sm transform transition-colors text-gray-200 hover:text-gray-400">
                  <SiZenn />
                  <a>&nbsp; Zenn</a>
                </div>
              </Link>

              <div>
                <Link href="/privacypolicy">
                  <div className="flex items-center py-1 text-sm transform transition-colors text-gray-200 hover:text-gray-400">
                    <FiAlertTriangle />
                    <a>&nbsp; Privacy Policy</a>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="block sm:hidden pt-6 text-center text-xs text-gray-200">
          © 2022-present Gourami Enginnering.
        </p>
      </div>
    </nav>
  );
};

export default Footer;
