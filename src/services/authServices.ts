"use server";
import { auth } from "@/auth";

// This is called by a client component to get the user's session because you cannot directly call the auth() function
export const getUser = async () => {
  return await auth();
};
