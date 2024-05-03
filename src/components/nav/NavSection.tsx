import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface NavSectionProps {
  children: ReactNode;
  title: string;
  tooltip?: string;
}

export default function NavSection({ children, title, tooltip }: NavSectionProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-start py-2">
          <h1 className="text-white text-sm uppercase">{title}</h1>
          {children}
        </div>
      </TooltipTrigger>
      {tooltip && <TooltipContent side="right">{tooltip}</TooltipContent>}
    </Tooltip>
  );
}
