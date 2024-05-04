"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavProfile from "@/components/layout/nav/NavProfile";
import NavBrowse from "./nav/NavBrowse";
import NavManage from "./nav/NavManage";
import NavShortcut from "./nav/NavShortcut";

export default function Nav() {
  return (
    <aside className="inset-y-0 w-full flex flex-col border-r bg-blue-custom lg:min-w-[18rem]">
      <nav className="flex flex-col w-full items-start gap-4 lg:px-12 lg:py-5">
        <TooltipProvider>
          <NavProfile />
          <NavBrowse />
          <NavManage />
          <NavShortcut />
        </TooltipProvider>
      </nav>
    </aside>
  );
}
