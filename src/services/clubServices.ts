"use server";
import "server-only";
import { postClubEntity } from "@/gateway/postClub";
import { getAllMembersForClub } from "@/gateway/getAllMembersForClub";
import { getClubs } from "@/gateway/getClubs";
import { Club } from "@/schemas/clubSchema";
import { AppUser } from "@/schemas/authSchema";

export async function postClub(club: Club, user: AppUser) {
  // All this does is proxy the gateway request, a real service may do the same or more advanced logic
  return postClubEntity(club, user);
}

export async function getAllMembers(clubId: number) {
  return await getAllMembersForClub(clubId);
}

export async function getAllClubs(name:string, filter?: string) {
  return await getClubs(name, filter);
}
