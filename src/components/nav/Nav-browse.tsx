import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function NavBrowse() {
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-white text-sm">BROWSE CLUBS</h1>
      <Button className="bg-blue-custom px-0">
        <Image
          src="nav-search-icon.svg"
          width={20}
          height={20}
          alt="Search Icon"
          className="icon mr-2 left-0"
        />
        <span className="text">Search For Clubs</span>
      </Button>
    </div>
  );
}
