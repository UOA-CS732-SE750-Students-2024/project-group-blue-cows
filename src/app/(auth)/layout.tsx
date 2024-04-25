import React from "react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = true; // TODO - Replace with authentication logic

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return <div>{children}</div>;
};

export default Layout;
