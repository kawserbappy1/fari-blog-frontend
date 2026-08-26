import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default AuthLayout;
