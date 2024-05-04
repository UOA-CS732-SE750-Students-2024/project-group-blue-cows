import Link from "next/link";
import { Button } from "../../ui/button";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  imgSrc: string;
  imgAlt?: string;
  children: ReactNode;
}

export default function NavTab({
  href,
  className,
  imgSrc,
  imgAlt,
  children,
}: Props) {
  return (
    <Link href={href}>
      <Button
        className={`bg-blue-custom px-0 hover:bg-transparent text-white hover:opacity-70 transition-opacity ${className}`}
      >
        <Image
          src={imgSrc}
          width={5}
          height={5}
          alt={imgAlt ?? ""}
          className="icon mr-2 left-0 w-5 h-5"
        />
        {children}
      </Button>
    </Link>
  );
}
