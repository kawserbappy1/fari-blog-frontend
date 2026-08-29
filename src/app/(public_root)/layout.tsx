import ResponsiveNav from "@/components/Shared/Navbar/ResponsiveNav";
import React from "react";
interface layoutProps {
  children: React.ReactNode;
}
const PublicLayout = ({ children }: layoutProps) => {
  return (
    <div>
      <ResponsiveNav></ResponsiveNav>
      {children}
    </div>
  );
};

export default PublicLayout;
