"use client";
import Link from "next/link";
import { Button } from "./button";

export function EditProfile() {
  return (
    <div className="flex items-center">
      <Link href="/users/me">
        <Button className="text-white hover:text-white-700 underline text-xs  whitespace-nowrap">
          Edit Profile
        </Button>
      </Link>
    </div>
  );
}
