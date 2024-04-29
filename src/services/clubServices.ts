"use server";
import { getAllMembersForClub } from "@/gateway/getAllMembersForClub";
import "server-only";

export async function getAllMembers(clubId: number) {
  return await getAllMembersForClub(clubId);
}


