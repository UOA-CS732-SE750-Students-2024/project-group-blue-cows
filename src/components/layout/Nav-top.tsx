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
      <div>
        <Link href="/">
          <Image
            src="/cowmunity-logo-title.svg"
            width={400}
            height={400}
            alt="Cowmunity Logo"
            className="object-scale-down pt-2 pl-8"
          />
        </Link>
      </div>
      <div className="ml-20">
        <Image
          src="/cowmunity-spots.svg"
          width={500}
          height={400}
          alt="Cowmunity pattern for top navbar"
          className="z-50"
        />
      </div>
      <TooltipProvider>
        <nav className="flex flex-row-reverse w-full space-x-4 items-center gap-4 px-2 lg:py-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-32 text-xl"
              >
                <span className="text-white">Profile</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Profile</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/clubs/admin"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-40 text-xl"
              >
                <span className="text-white">Manage Clubs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Manage Clubs</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/clubs"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-40 text-xl"
              >
                <span className="text-white">Browse Clubs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Browse Clubs</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}
