import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";

interface NavSectionProps {
  children: ReactNode;
  title: string;
  tooltip?: string;
  loggedInOnly?: boolean;
}

export default function NavSection({
  children,
  title,
  tooltip,
  loggedInOnly = false,
}: NavSectionProps) {
  const session = useSession();
  const user = session.data?.user as AppUser;

  if (loggedInOnly && !user) {
    return null;
  }

  return (
    <div className="flex flex-col items-start py-2 w-full">
      <h1 className="text-white text-sm uppercase">{title}</h1>
      {children}
    </div>
  );
}
