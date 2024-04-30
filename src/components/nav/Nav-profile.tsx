"Use client";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/AuthContext";
import Image from "next/image";
import { Button } from "../ui/button";
import { SignIn } from "../ui/sign-in";
import { SignOut } from "../ui/sign-out";
import { EditProfile } from "../ui/edit-profile";

export default function NavProfile() {
  const { user, token, currentUser, login, logout } = useContext(authContext);

  if (!currentUser) {
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
          src="/Tristan-Midjourney.png"
          alt="Icon for user not logged-in"
          width={40}
          height={40}
          className="rounded-full mr-5"
        />
        <div>
          <p className="text-m font-medium text-white">
            {currentUser?.name || "Undefined"}
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
