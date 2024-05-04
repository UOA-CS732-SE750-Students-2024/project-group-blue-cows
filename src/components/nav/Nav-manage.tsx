"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";

export default function NavManage() {
  const session = useSession();
  const user = session.data?.user as AppUser;

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-start py-2">
      <h1 className="text-white text-sm">MANAGE CLUBS</h1>
      <Link href="/users/me/clubs">
        <Button className="bg-blue-custom px-0 hover:bg-transparent">
          <Image
            src="nav-list-icon.svg"
            width={20}
            height={20}
            alt="Manage clubs icon"
            className="icon mr-2  left-0"
          />
          <span className="text">View My Clubs</span>
        </Button>
      </Link>
      <Link href="/clubs/new">
        <Button className="bg-blue-custom px-0 hover:bg-transparent">
          <Image
            src="nav-manage-icon.svg"
            width={20}
            height={20}
            alt="Register club icon"
            className="icon mr-2 left-0"
          />
          <span className="text">Register a New Club</span>
        </Button>
      </Link>
    </div>
  );
}
