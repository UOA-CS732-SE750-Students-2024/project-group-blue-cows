"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function SignOut() {
  return (
    <div className="flex items-center">
      <Link href="/">
        <p
          onClick={() => {
            signOut({ redirect: false });
          }}
          className="text-white hover:text-red-400 transition-colors underline text-xs whitespace-nowrap"
        >
          Sign Out
        </p>
      </Link>
    </div>
  );
}
