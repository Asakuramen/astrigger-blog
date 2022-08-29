import Link from "next/link";
import { IoPulseSharp } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <nav
      className={"h-12 mx-auto flex items-center z-10 bg-sky-900 shadow-sm sticky top-0"}
    >
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between w-full">
        <div>
          <Link href={"/blogs/all/1"}>
            <a>
              <span className="mx-8 text-xs text-gray-200 hover:text-gray-400 transition-colors transform">
                © 2022 Gourami Engineering
              </span>
            </a>
          </Link>
        </div>
        <div>
          <Link href={"/privacypolicy"}>
            <a>
              <span className="mx-8 text-xs text-gray-200 hover:text-gray-400 transition-colors transform">
                Privacy Policy
              </span>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
