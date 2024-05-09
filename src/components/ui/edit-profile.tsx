"use client";
import Link from "next/link";

export function EditProfile() {
  return (
    <div className="flex items-center">
      <Link href="/users/me">
        <p className="text-white hover:text-slate-300 transition-colors underline text-xs  whitespace-nowrap">
          Profile
        </p>
      </Link>
    </div>
  );
}
