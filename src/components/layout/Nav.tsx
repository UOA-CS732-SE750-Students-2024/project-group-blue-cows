import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import NavProfile from "@/components/nav/Nav-profile";
import NavBrowse from "../nav/Nav-browse";
import NavManage from "../nav/Nav-manage";

export default function Nav() {
  return (
    <aside className="inset-y-0 w-full flex flex-col border-r bg-blue-custom">
      <TooltipProvider>
        <nav className="flex flex-col w-full items-center gap-4 px-2 lg:py-5">
          <NavProfile />
          <Tooltip>
            <TooltipTrigger asChild>
              <NavBrowse />
            </TooltipTrigger>
            <TooltipContent side="right">Club Search</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavManage />
            </TooltipTrigger>
            <TooltipContent side="right">Club Management</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-20"
              >
                <Package className="h-5 w-5" />
                <span className="text-white">Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-20"
              >
                <Users2 className="h-5 w-20" />
                <span className="text-white">Customers</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-20"
              >
                <LineChart className="h-5 w-5" />
                <span className="text-white">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-20"
              >
                <Settings className="h-5 w-5" />
                <span className="text-white">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}
