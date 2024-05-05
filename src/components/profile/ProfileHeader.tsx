"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";
import LoadingSpinner from "../ui/loading-spinner";

export default function ProfileHeader() {
  const session = useSession();
  const user = session.data?.user as AppUser;
  if (!user) {
    return <LoadingSpinner />;
  }
  return (
    <div className="flex items-center py-4">
      <Image
        src={user?.image || ""}
        alt="Icon for user not logged-in"
        width={60}
        height={60}
        className="rounded-full mr-5"
      />
      <div className="flex-grow">
        <h1>Your Details</h1>
        <sub className="italic">Click on the boxes to edit.</sub>
      </div>
    </div>
  );
}
