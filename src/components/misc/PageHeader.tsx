import Link from "next/link";
import "server-only";
import { PageBackButton } from "./PageBackButton";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  href: string;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  href,
  className,
}: PageHeaderProps) {
  return (
    <div className={`flex ${className}`}>
      <PageBackButton href={href} className="shrink-0" />
      <div>
        <h2 className="text-lg lg:text-[length:calc(0.5rem+1.5vw)] font-extrabold leading-4 pb-[0.4em]">
          {title}
        </h2>
        <Link href={href} className="italic hover:underline text-sm lg:text-md">
          {subtitle}
        </Link>
      </div>
    </div>
  );
}