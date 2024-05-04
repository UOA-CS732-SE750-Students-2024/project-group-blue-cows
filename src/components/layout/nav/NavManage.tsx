"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";
import NavSection from "./NavSection";
import NavTab from "./NavTab";

export default function NavManage() {
  const session = useSession();
  const user = session.data?.user as AppUser;

  if (!user) {
    return null;
  }

  return (
    <NavSection title="Manage Clubs" tooltip="Manage your clubs">
      <NavTab href="/users/me/clubs" imgSrc="/nav-list-icon.svg">
        View My Clubs
      </NavTab>
      <NavTab href="/clubs/register" imgSrc="/nav-manage-icon.svg">
        Register a New Club
      </NavTab>
    </NavSection>
  );
}
