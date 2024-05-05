"use client";

import { AppUser } from "@/schemas/authSchema";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// Testing page is now at /test
export default function RootPage() {
  const session = useSession();
  const user = session?.data?.user as AppUser;
  redirect(user ? "/users/me/clubs" : "/clubs");
}
