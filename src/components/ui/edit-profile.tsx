"use client";
import Link from "next/link";

export function EditProfile() {
  return (
    <div className="flex items-center">
      <Link href="/users/me">
        <button className="text-white hover:text-white-700 underline text-xs  whitespace-nowrap">
          Edit Profile
        </button>
      </Link>
    </div>
  );
}
