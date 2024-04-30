"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function SignOut() {
  return (
    <Link href="/">
      <button
        onClick={() => signOut()}
        className="text-white hover:text-white-700 underline text-xs"
      >
        Sign Out
      </button>
    </Link>
  );
}
