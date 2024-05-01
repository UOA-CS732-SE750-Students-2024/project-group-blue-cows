"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function SignOut() {
  return (
    <div className="flex items-center">
      <Link href="/">
        <button
          onClick={() => signOut()}
          className="text-white hover:text-white-700 underline text-xs whitespace-nowrap"
        >
          Sign Out
        </button>
      </Link>
    </div>
  );
}
