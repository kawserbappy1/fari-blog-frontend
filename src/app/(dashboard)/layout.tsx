import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <h1>dashboard header</h1>
      {children}
      <h1>dashboard footer</h1>
    </div>
  );
};

export default DashboardLayout;
