"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="text-white hover:text-white-700 underline text-xs"
    >
      Sign Out
    </button>
  );
}
