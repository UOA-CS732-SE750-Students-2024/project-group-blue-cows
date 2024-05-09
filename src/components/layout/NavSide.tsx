"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavProfile from "@/components/layout/nav/NavProfile";
import NavBrowse from "./nav/NavBrowse";
import NavManage from "./nav/NavManage";
import NavShortcut from "./nav/NavShortcut";

export default function NavSide({ className }: { className?: string }) {
  return (
    <aside
      className={`w-1/6 lg:min-w-[16rem] min-w-[12rem] flex flex-col items-center lg:p-6 content-middle bg-blue-custom ${className}`}
    >
      <nav className="flex flex-col items-start lg:gap-4">
        <NavProfile />
        <NavBrowse />
        <NavManage />
        <NavShortcut />
      </nav>
    </aside>
  );
}
