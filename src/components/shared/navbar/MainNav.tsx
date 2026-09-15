"use client";

import Logo from "./Logo";
import { navLinks } from "./navLinks";
import Link from "next/link";
import { Menu } from "lucide-react";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

type Props = {
  openNav: () => void;
};

const MainNav = ({ openNav }: Props) => {
  const user = true;
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 h-16 w-full">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <div className="hidden items-center gap-5 sm:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                href={link.href}
                key={link.id}
                className={`relative text-md transition-colors duration-300 hover:text-primary ${
                  isActive
                    ? "text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu />
          ) : (
            <Link
              href="/"
              className="cursor-pointer rounded-full bg-primary px-2 py-1 text-xs text-white transition-colors hover:bg-primary sm:px-4 sm:py-2 sm:text-md"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu */}
          <Menu
            onClick={openNav}
            className="h-6 w-6 cursor-pointer text-black sm:hidden"
          />
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
