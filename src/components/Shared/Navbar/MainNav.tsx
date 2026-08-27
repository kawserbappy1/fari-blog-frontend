"use client";
import { FolderPen, Menu } from "lucide-react";
import Link from "next/link";
import { navLinks } from "./NavMenuLinks";
import { Button } from "@/components/ui/button";

type props = {
  openNav: () => void;
};
const MainNav = ({ openNav }: props) => {
  return (
    <div className=" transition-all duration-200 h-[12vh] z-50 fixed w-full">
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* logo here  */}
        <Link href="#">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center">
              <FolderPen className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-lg">
              Fari <span className="text-cyan-400">Blog</span>
            </h1>
          </div>
        </Link>

        {/* Nav Menu Here  */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className="text-md transition-all duration-500 hover:text-cyan-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Button area  */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="py-2 px-4 cursor-pointer bg-cyan-400 rounded-full text-md text-white"
          >
            Login
          </Link>
          <Menu
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-black lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
