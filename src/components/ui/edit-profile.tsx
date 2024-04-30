"use client";
import Link from "next/link";

export function EditProfile() {
  return (
    <Link href="/profile">
      <button className="text-white hover:text-white-700 underline text-xs">
        Edit Profile
      </button>
    </Link>
  );
}
