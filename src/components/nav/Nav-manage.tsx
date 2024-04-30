"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { User } from "next-auth";
import { getUser } from "@/services/authServices";
import { authContext } from "../contexts/AuthContext";

export default function NavManage() {
  const { user, token, currentUser, login, logout } = useContext(authContext);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex flex-col items-start py-2">
      <h1 className="text-white text-sm">MANAGE CLUBS</h1>
      <Button className="bg-blue-custom px-0 hover:bg-transparent">
        <Image
          src="nav-list-icon.svg"
          width={20}
          height={20}
          alt="Manage clubs icon"
          className="icon mr-2  left-0"
        />
        <span className="text">View My Clubs</span>
      </Button>
      <Button className="bg-blue-custom px-0 hover:bg-transparent">
        <Image
          src="nav-manage-icon.svg"
          width={20}
          height={20}
          alt="Register club icon"
          className="icon mr-2 left-0"
        />
        <span className="text">Register a New Club</span>
      </Button>
    </div>
  );
}
