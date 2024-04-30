"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useContext, useState } from "react";
import { authContext } from "../contexts/AuthContext";
import { getUser } from "@/services/authServices";
import { User } from "next-auth";

export default function NavAdmin() {
  // Getting the auth state within a client component
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined); // if the session does not exist, user will be undefined

  useEffect(() => {
    getUser().then((session) => {
      setCurrentUser(session?.user);
    });
  }, []); // empty dependency array, will only run on component mount

  if (!currentUser) {
    return null;
  }
  return (
    <div className="flex flex-col items-start py-2">
      <h1 className="text-white text-sm">CLUB ADMIN</h1>
    </div>
  );
}
