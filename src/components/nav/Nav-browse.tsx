import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function NavBrowse() {
  return (
    <div>
      <h1 className="text-white">Browse Clubs</h1>
      {/* <span className="text-white justify-center capitalize">Browse Clubs</span> */}
      <Button className="bg-blue-custom">
        <Image
          src="nav-search-icon.svg"
          width={20}
          height={20}
          alt="Search Icon"
          className="icon mr-2"
        />
        <span className="text">Search For Clubs</span>
      </Button>
    </div>
  );
}
