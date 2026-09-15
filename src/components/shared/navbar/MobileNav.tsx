import { navLinks } from "./navLinks";
import Link from "next/link";
import { X } from "lucide-react";

type props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ showNav, closeNav }: props) => {
  const navOpen = showNav ? "translate-x-0" : "-translate-x-full";
  return (
    <>
      <div
        className={`fixed inset-0 transform transition-all duration-500 z-30 bg-black/70 w-full h-screen ${navOpen}`}
      ></div>
      <div
        className={`text-white fixed flex flex-col justify-center h-full transform transition-all duration-500 z-50 delay-300 w-[90%] bg-cyan-400 sm:w-[80%] space-y-2 ${navOpen}`}
      >
        {navLinks.map((link) => (
          <Link
            href={link.href}
            key={link.id}
            className="text-white w-fit text-md ml-12 border-b-[1.5px] pb-1 border-white "
          >
            {link.label}
          </Link>
        ))}

        <X
          onClick={closeNav}
          className="absolute top-4 right-4 w-8 h-8 cursor-pointer"
        />
      </div>
    </>
  );
};

export default MobileNav;
