import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <aside className="flex flex-row inset-y-0 ml-auto items-center w-full bg-blue-custom">
      <Image
        src="/cowmunity-logo-title.svg"
        width={350}
        height={350}
        alt="Cowmunity Logo"
        className="object-scale-down pt-2 pl-8"
        priority
      />
      <Image
        src="/cowmunity-spots.svg"
        width={500}
        height={400}
        alt="Cowmunity pattern for top navbar"
        className="z-10 h-16 w-auto absolute hidden lg:block left-60 xl:left-72"
        priority
      />
      <TooltipProvider>
        <nav className="flex flex-row-reverse w-full space-x-4 items-center gap-4 px-2 lg:py-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-32 text-xl"
              >
                <span className="text-white">Profile</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Profile</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-40 text-xl"
              >
                <span className="text-white">Manage Clubs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Manage Clubs</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-40 text-xl"
              >
                <span className="text-white">Browse Clubs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Browse Clubs</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}
