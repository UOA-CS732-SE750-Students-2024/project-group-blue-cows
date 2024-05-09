"use server";
import { CreateClubDto } from "@/Dtos/club/CreateClubDto";
import { UpdateClubDto } from "@/Dtos/club/UpdateClubDto";
import { PostMemberDto } from "@/Dtos/member/PostMemberDto";
import { PutMemberDto } from "@/Dtos/member/PutMemberDto";
import { getAdminsForClub } from "@/gateway/club/getAdminsForClub";
import { getClub } from "@/gateway/club/getClub";
import { getClubs } from "@/gateway/club/getClubs";
import { getClubsForAdmin } from "@/gateway/club/getClubsForAdmin";
import { getClubsForUser } from "@/gateway/club/getClubsForUser";
import { postClubEntity } from "@/gateway/club/postClub";
import { putClub } from "@/gateway/club/putClub";
import { deleteAllMembers } from "@/gateway/member/deleteAllMembers";
import { deleteMember } from "@/gateway/member/deleteMember";
import { getMemberForClub } from "@/gateway/member/getMemberForClub";
import { getMembersAllDataForClub } from "@/gateway/member/getMembersAllDataForClub";
import { postMember } from "@/gateway/member/postMember";
import { postMembersData } from "@/gateway/member/postMembersData";
import { putMember } from "@/gateway/member/putMember";
import { AppUser } from "@/schemas/authSchema";
import { studentAllData } from "@/util/csvUtils";
import { revalidatePath } from "next/cache";
import "server-only";

export async function postClub(club: CreateClubDto, user: AppUser) {
  // All this does is proxy the gateway request, a real service may do the same or more advanced logic
  return postClubEntity(club, user);
}

export async function updateClub(clubId: number, club: UpdateClubDto) {
  revalidatePath(`/clubs/${clubId}/admin`);
  revalidatePath(`/src`); // this could make the site extremely slow
  return putClub(clubId, club);
}

export async function getAllMembers(clubId: number) {
  return await getMembersAllDataForClub(clubId);
}

export async function getAllClubs(name: string, filter: string | null) {
  return await getClubs(name, filter);
}

export async function addMember(member: PostMemberDto) {
  return await postMember(member);
}

export async function updateMember(
  clubId: number,
  userId: string,
  membership: PutMemberDto
) {
  return await putMember(clubId, userId, membership);
}

export async function removeMember(clubId: number, userId: string) {
  return await deleteMember(clubId, userId);
}

export async function removeAllMembers(clubId: number) {
  revalidatePath(`/clubs/${clubId}/members`);
  return await deleteAllMembers(clubId);
}

export async function getClubById(clubID: number) {
  return await getClub(clubID);
}

export async function importClubMembers(
  clubId: number,
  memberData: studentAllData[]
) {
  revalidatePath(`/clubs/${clubId}/members`);
  return await postMembersData(clubId, memberData);
}

export async function fetchMemberForClub(userId: string, clubId: number) {
  return await getMemberForClub(userId, clubId);
}

export async function getListOfClubsForUser(userId: string) {
  return getClubsForUser(userId);
}

export async function getListOfClubsForAdmin(userId: string) {
  return getClubsForAdmin(userId);
}

export async function getListOfAdminsForClub(clubId: number) {
  return getAdminsForClub(clubId);
}