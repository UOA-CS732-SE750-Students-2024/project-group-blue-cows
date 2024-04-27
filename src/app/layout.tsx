"use static";
import "server-only";
import "@/config/db";
import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Nav from "@/components/layout/Nav";
import NavTop from "@/components/layout/Nav-top";
import NavProfile from "@/components/layout/nav-profile";

export const metadata: Metadata = {
  title: "Cowmunity",
  description: "Cowmunity from project group Blue Cows SE750",
  icons: {
    icon: "icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="h-1/10 flex flex-direction-row">
          <NavTop />
        </div>
        <div className="h-9/10 flex flex-direction-col">
          <div className="w-1/6 h-screen flex box-border">
            <Nav />
          </div>
          <div className="w-5/6 ">
            {children}
            <ToastContainer />
          </div>
        </div>
      </body>
    </html>
  );
}
