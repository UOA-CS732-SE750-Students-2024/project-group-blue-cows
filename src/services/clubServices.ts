"use server";
import { getAllMembersForClub } from "@/gateway/getAllMembersForClub";
import { getClubs } from "@/gateway/getClubs";
import "server-only";

export async function getAllMembers(clubId: number) {
  return await getAllMembersForClub(clubId);
}

export async function getAllClubs(name:string, filter?: string) {
  return await getClubs(name, filter);
}
