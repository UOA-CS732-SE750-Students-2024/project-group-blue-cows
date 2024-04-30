import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NavBrowse() {
  return (
    <div className="flex flex-col items-start py-2">
      <h1 className="text-white text-sm">BROWSE CLUBS</h1>
      <Link href="/clubs">
        <Button className="bg-blue-custom px-0 hover:bg-transparent">
          <Image
            src="nav-search-icon.svg"
            width={20}
            height={20}
            alt="Search Icon"
            className="icon mr-2 left-0"
          />
          <span className="text">Search For Clubs</span>
        </Button>
      </Link>
    </div>
  );
}
