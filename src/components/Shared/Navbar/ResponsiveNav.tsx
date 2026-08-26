"use client";
import { useState } from "react";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const openNavHandler = () => {
    setShowNav(true);
  };
  const closeNavHandler = () => {
    setShowNav(false);
  };
  return (
    <div>
      <MainNav openNav={openNavHandler} />
      <MobileNav showNav={showNav} closeNav={closeNavHandler} />
    </div>
  );
};

export default ResponsiveNav;
