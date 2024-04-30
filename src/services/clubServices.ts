"use server";
import { getClubs } from "@/gateway/getClubs";
import "server-only";

export async function getAllClubs(name: string, filter?: string) {
  return await getClubs(name, filter);
}
