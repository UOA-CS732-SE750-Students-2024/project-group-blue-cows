import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function NavManage() {
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-white text-sm">MANAGE CLUBS</h1>
      <Button className="bg-blue-custom px-0 ">
        <Image
          src="nav-list-icon.svg"
          width={20}
          height={20}
          alt="Manage clubs icon"
          className="icon mr-2 left-0"
        />
        <span className="text">View My Clubs</span>
      </Button>
      <Button className="bg-blue-custom px-0">
        <Image
          src="nav-manage-icon.svg"
          width={20}
          height={20}
          alt="Register club icon"
          className="icon mr-2 left-0"
        />
        <span className="text">Register a New Club</span>
      </Button>
    </div>
  );
}
