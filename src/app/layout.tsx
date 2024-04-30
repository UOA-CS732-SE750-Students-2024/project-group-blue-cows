"use static";
import "server-only";
import "@/config/db";
import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Nav from "@/components/layout/Nav";
import NavTop from "@/components/layout/NavTop";

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
        <div className="h-16 flex flex-direction-row">
          <NavTop />
        </div>
        <div className="flex h-[calc(100vh-4rem)] flex-direction-col">
          <div className="w-48 h-full flex box-border">
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
