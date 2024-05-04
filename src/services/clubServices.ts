"use server";
import "server-only";
import { postClubEntity } from "@/gateway/postClub";
import { getAllMembersForClub } from "@/gateway/getAllMembersForClub";
import { postMember } from "@/gateway/postMember";
import { putMember } from "@/gateway/putMember";
import { getClubs } from "@/gateway/getClubs";
import { Club } from "@/schemas/clubSchema";
import { AppUser } from "@/schemas/authSchema";
import { Membership } from "@/schemas/membershipSchema";
import {  putMemberDto} from "@/gateway/putMember";

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
  member: Membership
) {
  return await postMember(member);
}

export async function updateMember(
  clubId: number,
  userId: string,
  membership: putMemberDto
) {
  return await putMember(clubId, userId, membership);
}
