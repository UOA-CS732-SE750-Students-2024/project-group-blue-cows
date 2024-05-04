"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";
import NavTab from "./NavTab";

export default function NavManage() {
  const session = useSession();
  const user = session.data?.user as AppUser;

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-start py-2">
      <h1 className="text-white text-sm">MANAGE CLUBS</h1>
      <NavTab
        href="/users/me/clubs"
        imgSrc="nav-list-icon.svg"
        imgAlt="Manage clubs icon"
      >
        <span className="text">View My Clubs</span>
      </NavTab>
      <NavTab
        href="/create-club"
        imgSrc="nav-manage-icon.svg"
        imgAlt="Register club icon"
      >
        <span className="text">Register a New Club</span>
      </NavTab>
    </div>
  );
}
