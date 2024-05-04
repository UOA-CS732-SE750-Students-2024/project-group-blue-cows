"Use client";
import React from "react";
import Image from "next/image";
import { SignIn } from "../ui/sign-in";
import { SignOut } from "../ui/sign-out";
import { EditProfile } from "../ui/edit-profile";
import { useSession } from "next-auth/react";
import { AppUser } from "@/schemas/authSchema";

export default function NavProfile() {
  const session = useSession();
  const user = session.data?.user as AppUser;

  if (!user) {
    return (
      <div className="flex flex-col items-center py-2">
        <div>
          <Image
            src="/cowmunity-lock.svg"
            alt="Icon for user not logged-in"
            width={50}
            height={50}
          />
        </div>
        <div className="pt-2">
          <p className="text-sm font-medium text-white text-center">
            Please sign in to access more features
          </p>
        </div>
        <div className="pt-2">
          <SignIn />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center py-5">
        <Image
          src={user?.image || ""}
          alt="Icon for user not logged-in"
          width={40}
          height={40}
          className="rounded-full mr-5"
        />
        <div>
          <p className="text-m font-medium text-white">
            {user?.name || "Undefined"}
          </p>
          <div className="flex items-center space-x-3">
            <EditProfile />
            <SignOut />
          </div>
        </div>
      </div>
    );
  }
}
