import { navLinks } from "./NavMenuLinks";
import Link from "next/link";
import { X } from "lucide-react";

type props = {
  showNav: boolean;
  closeNav: () => void;
};
const MobileNav = ({ showNav, closeNav }: props) => {
  const navOpen = showNav ? "translate-x-0" : "-translate-x-full";
  return (
    <div>
      <div
        className={`fixed inset-0 transform transition-all duration-500 z-30 bg-black/70 w-full h-screen ${navOpen}`}
      ></div>
      <div
        className={`text-white fixed flex justify-center flex-col h-full transform transition-all duration-500 z-50 delay-300 w-[80%] bg-cyan-400 sm:w-[60%] space-y-2 ${navOpen}`}
      >
        {navLinks.map((link) => {
          return (
            <Link
              href={link.url}
              key={link.id}
              className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white "
            >
              {link.label}
            </Link>
          );
        })}

        <X
          onClick={closeNav}
          className="absolute top-4 right-4 w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileNav;
