"use client";
import { Input } from "@/components/ui/input";
import { AppUser } from "@/schemas/authSchema";
import { useSession } from "next-auth/react";
import React from "react";
import LoadingSpinner from "../ui/loading-spinner";

export default function ProfileEditBody() {
  const session = useSession();
  const user = session.data?.user as AppUser;
  if (!user) {
    return <LoadingSpinner />;
  }
  // TODO - Retrieve user data from the server and populate the input fields with default values
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid-item">
        <h2 className="text-sm font-bold">UPI (e.g. 'abc123')</h2>
        <Input defaultValue={user.upi || ""} />
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">Student ID (e.g. '123456789')</h2>
        <Input defaultValue={user.id || ""} />
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">University</h2>
        <Input defaultValue={""} />
        {/* TODO - Populate with user's university - ADD TO SCHEMA?*/}
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">Year Level</h2>
        <Input defaultValue={user.year_of_study || ""} />
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">Degree</h2>
        <Input defaultValue={""} />
        {/* TODO - Populate with user's degree - ADD TO SCHEMA?*/}
      </div>
      <div className="grid-item">
        <h2 className="text-sm font-bold">Specialisation/Majors</h2>
        <Input defaultValue={""} />
        {/* TODO - Populate with user's major - ADD TO SCHEMA?*/}
      </div>
    </div>
  );
}
