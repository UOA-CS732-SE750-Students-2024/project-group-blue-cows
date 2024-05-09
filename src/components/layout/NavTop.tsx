"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";

export default function NavTop({ className }: { className?: string }) {
  const { data: session } = useSession();
  const user = session?.user as AppUser;

  return (
    <aside
      className={`flex flex-row items-center w-full bg-blue-custom ${className}`}
    >
      <div>
        <Link href="/" className="h-full">
          <Image
            src="/cowmunity-logo-title.svg"
            width={400}
            height={400}
            alt="Cowmunity Logo"
            className="pt-2 pl-8 h-full"
            priority
          />
        </Link>
      </div>
      <div className="ml-20 h-full">
        <Image
          src="/cowmunity-spots.png"
          width={500}
          height={400}
          alt="Cowmunity pattern for top navbar"
          className="z-50 h-full"
          priority
        />
      </div>
      <nav className="flex flex-row justify-end w-full space-x-4 items-center pl-2 pr-8 lg:py-10">
        <TooltipProvider>
          <NavItem href="/clubs">
            <div>Browse Clubs</div>
          </NavItem>
          {user && ( // Conditionally render "Manage Clubs" and "Profile" if user exists
            <>
              <NavItem href="/users/me/clubs">Manage Clubs</NavItem>
              <NavItem href="/users/me">Profile</NavItem>
            </>
          )}
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
    <Link
      href={href}
      className="text-white hover:text-black flex p-2 h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-36 text-md md:text-lg hover:bg-customAccent"
    >
      {children}
    </Link>
  );
}
