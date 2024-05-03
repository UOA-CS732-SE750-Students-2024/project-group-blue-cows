import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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

  // const { currentUser } = useAuth(); // Need Luca to set up auth first
  // if (loggedInOnly && !currentUser) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-start py-2 w-full">
          <h1 className="text-white text-sm uppercase">{title}</h1>
          {children}
        </div>
      </TooltipTrigger>
      {tooltip && <TooltipContent side="right">{tooltip}</TooltipContent>}
    </Tooltip>
  );
}
