"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";
import LoadingSpinner from "../ui/loading-spinner";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export default function ProfileHeader() {
  const session = useSession();
  const user = session.data?.user as AppUser;
  if (!user) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <Card className="w-full bg-[#FFD166]">
        <CardHeader>
          <h1 className="text-2xl">Edit Profile</h1>
        </CardHeader>
        <CardContent>
          <p>
            Your name, email and profile picture are managed by your Google
            Account. If you need to change these details, please do so in your
            Google Account settings.
          </p>
        </CardContent>
        <CardFooter>
          <p></p>
        </CardFooter>
      </Card>
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
    </div>
  );
}
