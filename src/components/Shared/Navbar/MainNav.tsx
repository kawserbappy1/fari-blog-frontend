"use client";

import { FolderPen, Menu, Loader2 } from "lucide-react";
import Link from "next/link";
import { navLinks } from "./NavMenuLinks";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "@/components/themes/ThemeToggle";

type Props = {
  openNav: () => void;
};

const MainNav = ({ openNav }: Props) => {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <div className="transition-all duration-200 h-[12vh] z-50 fixed w-full">
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* ======================================
            Logo
        ======================================= */}

        <Link href="/">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <FolderPen className="w-6 h-6 text-white" />
            </div>

            <h1 className="font-bold text-lg">Fari Blog</h1>
          </div>
        </Link>

        {/* ======================================
            Navigation
        ======================================= */}

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className="text-md transition-all duration-500 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ======================================
            Right Side
        ======================================= */}

        <div className="flex items-center gap-3">
          {/* User */}
          <ThemeToggle></ThemeToggle>
          {isLoading ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin bg-primary" />
            </div>
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 cursor-pointer bg-primary rounded-full text-md text-white hover:bg-primary transition-colors"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu */}

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
