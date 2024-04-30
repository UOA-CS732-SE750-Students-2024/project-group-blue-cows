"use server";
import { getClubs } from "@/gateway/getClubs";
import "server-only";

export async function getAllClubs(name: string, filter?: string) {
  return getClubs(name, filter);
}
