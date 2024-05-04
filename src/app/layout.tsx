"use static";
import "server-only";
import "@/config/db";
import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Nav from "@/components/layout/Nav";
import NavTop from "@/components/layout/Nav-top";
import { SessionProvider } from "next-auth/react";

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
      <SessionProvider>
        <body>
          <div className="h-[calc(4rem)] w-full flex flex-row top-0 fixed">
            <NavTop />
          </div>
          <div className="pt-[4rem] h-[calc(100vh-4rem)] flex flex-direction-col">
            <div className="w-1/6 h-full flex box-border fixed">
              <Nav />
            </div>
            <div className="w-5/6 flex items-center justify-center ml-auto overflow-auto">
              {children}
              <ToastContainer />
            </div>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
