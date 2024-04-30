"Use client";
import { getUser } from "@/services/authServices";
import { User } from "next-auth";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/AuthContext";

export default function NavProfile() {
  // const [currentUser, setCurrentUser] = useState<User | undefined>(undefined); // if the session does not exist, user will be undefined
  const { user, token, currentUser, login, logout } = useContext(authContext);

  if (!currentUser) {
    <div className="flex flex-direction-row items-center py-5">
      <img
        src="/cowmunity-lock.svg"
        alt="Icon for user not logged-in"
        className="w-10 h-10"
      />
      <p>
        Please sign in to access <br />
        more features
      </p>
    </div>;
  }

  return (
    <div className="flex items-center py-5">
      <img
        src="/Tristan-Midjourney.png"
        alt="User Profile"
        className="rounded-full w-10 h-10 mr-5"
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
