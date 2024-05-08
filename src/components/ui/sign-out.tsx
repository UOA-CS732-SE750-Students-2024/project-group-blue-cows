"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./button";

export function SignOut() {
  return (
    <div className="flex items-center">
      <Link href="/">
        <p
          onClick={() => {
            signOut({ redirect: false });
          }}
          className="text-red-400 hover:text-white-700 underline text-xs whitespace-nowrap"
        >
          Sign Out
        </p>
      </Link>
    </div>
  );
}
