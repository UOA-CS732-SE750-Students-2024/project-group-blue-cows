"use server";
import "server-only";
import { postClubEntity } from "@/gateway/postClub";
import { getAllMembersForClub } from "@/gateway/getAllMembersForClub";
import { postMember } from "@/gateway/postMember";
import { putMember } from "@/gateway/putMember";
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

export async function getAllClubs(name: string, filter: string | null) {
  return await getClubs(name, filter);
}

export async function addMember(
  clubId: number,
  user: AppUser,
  isPaid: boolean,
  isAdmin: boolean
) {
  return await postMember(clubId, user, isPaid, isAdmin);
}

export async function updateMember(
  clubId: number,
  userId: string,
  isPaid: boolean,
  isAdmin: boolean
) {
  return await putMember(clubId, userId, isPaid, isAdmin);
}
