"use server";
import { signIn } from "@/auth";

export const signInAction = async (provider: string) => {
  return await signIn(provider);
};
