"use client";
import { Input } from "@/components/ui/input";
import React, { useContext } from "react";
import { authContext } from "@/components/contexts/AuthContext";

export default function ProfileEditBody() {
  const { user, token, currentUser, login, logout } = useContext(authContext);
  // TODO - Retrieve user data from the server and populate the input fields with default values
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid-item">
        <h2 className="text-sm font-bold">UPI (e.g. 'abc123')</h2>
        <Input />
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">Student ID (e.g. '123456789')</h2>
        <Input />
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">University</h2>
        <Input />
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">Year Level</h2>
        <Input />
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">Degree</h2>
        <Input />
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">Specialisation/Majors</h2>
        <Input />
      </div>
    </div>
  );
}
