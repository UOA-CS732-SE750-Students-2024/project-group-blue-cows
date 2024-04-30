"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Session } from "next-auth";
import { authContext } from "@/components/contexts/AuthContext";

export default function ProfileHeader() {
  const { user, token, currentUser, login, logout } = useContext(authContext);
  return (
    <div className="flex items-center">
      <Image
        src="/Tristan-Midjourney.png"
        width={100}
        height={100}
        alt=""
        className="rounded-full"
      />
      <div>
        <p className="text-sm font-medium">
          {currentUser?.name || "Undefined"}
        </p>
        <Input />
      </div>
    </div>
  );
}
