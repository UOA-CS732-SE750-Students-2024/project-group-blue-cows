"Use client";
import { getUser } from "@/services/authServices";
import { User } from "next-auth";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/AuthContext";
import Image from "next/image";
import { Button } from "../ui/button";

export default function NavProfile() {
  // const [currentUser, setCurrentUser] = useState<User | undefined>(undefined); // if the session does not exist, user will be undefined
  const { user, token, currentUser, login, logout } = useContext(authContext);

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center py-5">
        <div>
          <Image
            src="/cowmunity-lock.svg"
            alt="Icon for user not logged-in"
            width={80}
            height={80}
          />
        </div>
        <div className="pt-2">
          <p className="text-sm font-medium text-white text-center">
            Please sign in to access more features
          </p>
        </div>
        <div className="pt-2">
          <Button variant="default" className=" bg-blue-500 text-white">
            <span className="text">Sign in or Register</span>
          </Button>
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
          <p className="text-m font-medium text-white">User Name</p>
          <button className="text-white hover:text-white-700 underline text-xs">
            Edit Profile
          </button>
        </div>
      </div>
    );
  }
}
