"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { authContext } from "@/components/contexts/AuthContext";

export default function ProfileHeader() {
  const { user, token, currentUser, login, logout } = useContext(authContext);
  // TODO - add a modal form to replace the user profile picture?
  return (
    <div className="flex items-center py-4">
      <Image
        src="/Tristan-Midjourney.png"
        width={96}
        height={96}
        alt="User profile picture"
        className="rounded-full mr-10"
      />
      <div className="flex-grow">
        <h1>Your Details</h1>
        <sub className="italic">Click on the boxes to edit.</sub>
        <h2 className="text-sm font-bold">Full Name</h2>
        <Input defaultValue={currentUser?.name || "Undefined"} />
      </div>
    </div>
  );
}
