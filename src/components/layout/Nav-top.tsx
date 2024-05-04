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
            priority
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
          priority
        />
      </div>
      <nav className="flex flex-row justify-end w-full space-x-4 items-center pl-2 pr-8 lg:py-10">
        <TooltipProvider>
          <NavItem href="/clubs" tooltip="Browse Clubs">
            Browse Clubs
          </NavItem>
          <NavItem href="/users/me/clubs" tooltip="Manage Clubs">
            Manage Clubs
          </NavItem>
          <NavItem href="/users/me" tooltip="Profile">
            Profile
          </NavItem>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

function NavItem({
  href,
  tooltip,
  children,
}: {
  href: string;
  tooltip?: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className="text-white hover:text-black flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-32 text-md md:text-lg hover:bg-customAccent"
        >
          {children}
        </Link>
      </TooltipTrigger>
      {tooltip && <TooltipContent side="bottom">{tooltip}</TooltipContent>}
    </Tooltip>
  );
}