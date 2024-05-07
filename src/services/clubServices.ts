"use server";
import "server-only";
import { postClubEntity } from "@/gateway/postClub";
import { getAllMembersForClub } from "@/gateway/getAllMembersForClub";
import { postMember, postMemberDto } from "@/gateway/postMember";
import { putMember } from "@/gateway/putMember";
import { getClubs } from "@/gateway/getClubs";
import { CreateClubDto, UpdateClubDto } from "@/schemas/clubSchema";
import { AppUser } from "@/schemas/authSchema";
import { putMemberDto } from "@/gateway/putMember";
import { getClub } from "@/gateway/getClub";
import { putClub } from "@/gateway/putClub";
import { postMembersData } from "@/gateway/postMembersData";
import { getMemberForClub } from "@/gateway/getMemberForClub";
import { studentAllData } from "@/util/csvUtils";
import { revalidatePath } from "next/cache";

export async function postClub(club: CreateClubDto, user: AppUser) {
  // All this does is proxy the gateway request, a real service may do the same or more advanced logic
  return postClubEntity(club, user);
}

export async function updateClub(clubId: number, club: UpdateClubDto) {
  return putClub(clubId, club);
}

export async function getAllMembers(clubId: number) {
  revalidatePath(`clubs/${clubId}/members`);
  return await getAllMembersForClub(clubId);
}

export async function getAllClubs(name: string, filter: string | null) {
  return await getClubs(name, filter);
}

export async function addMember(member: postMemberDto) {
  return await postMember(member);
}

export async function updateMember(
  clubId: number,
  userId: string,
  membership: putMemberDto,
) {
  return await putMember(clubId, userId, membership);
}

export async function getClubById(clubID: number) {
  return await getClub(clubID);
}

export async function importClubMembers(
  clubId: number,
  memberData: studentAllData[],
) {
  return await postMembersData(clubId, memberData);
}

export async function fetchMemberForClub(userId: string, clubId: number) {
  return await getMemberForClub(userId, clubId);
}
