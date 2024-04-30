"use static";
import "server-only";
import "@/config/db";
import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Nav from "@/components/layout/Nav";
import NavTop from "@/components/layout/Nav-top";
import { AuthContextProvider } from "@/components/contexts/AuthContext";

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
      <AuthContextProvider>
        <body>
          <div className="h-[calc(4rem)] flex flex-row sticky top-0">
            <NavTop />
          </div>
          <div className="h-[calc(100vh-4rem)] flex flex-direction-col">
            <div className="w-1/6 h-full flex box-border fixed">
              <Nav />
            </div>
            <div className="w-5/6 flex items-center justify-center">
              {children}
              <ToastContainer />
            </div>
          </div>
        </body>
      </AuthContextProvider>
    </html>
  );
}
