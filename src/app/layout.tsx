"use static";
import "server-only";
import "@/config/db";
import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NavSide from "@/components/layout/NavSide";
import NavTop from "@/components/layout/NavTop";
import { SessionProvider } from "next-auth/react";
import { Modal } from "@/components/misc/Modal";

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
      <body className="flex flex-col h-auto">
        <SessionProvider>
          <NavTop className="h-[4rem]" />
          <div className="flex flex-auto overflow-hidden h-[calc(100vh-4rem)]">
            <NavSide />
            <div className="flex-auto overflow-auto">{children}</div>
          </div>
          <ToastContainer />
          <Modal />
        </SessionProvider>
      </body>
    </html>
  );
}
