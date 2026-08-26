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
      <h1>Public Layout Footer</h1>
    </div>
  );
};

export default PublicLayout;
