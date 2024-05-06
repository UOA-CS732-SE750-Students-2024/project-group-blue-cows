"use server";
import "server-only";
import { postClubEntity } from "@/gateway/postClub";
import { getAllMembersForClub } from "@/gateway/getAllMembersForClub";
import { postMember } from "@/gateway/postMember";
import { PostMemberDto } from "@/Dtos/PostMember";
import { putMember } from "@/gateway/putMember";
import { getClubs } from "@/gateway/getClubs";
import { CreateClubDto } from "@/Dtos/CreateClubDto";
import { UpdateClubDto } from "@/Dtos/UpdateClubDto";
import { AppUser } from "@/schemas/authSchema";
import { PutMemberDto } from "@/Dtos/PutMember";
import { getClub } from "@/gateway/getClub";
import { putClub } from "@/gateway/putClub";
import { getMembersDataInCSV } from "@/gateway/getMembersDataInCsv";
import { postMembersDataFromCSV } from "@/gateway/postMembersDataFromCsv";
import { getMemberForClub } from "@/gateway/getMemberForClub";

export async function postClub(club: CreateClubDto, user: AppUser) {
  // All this does is proxy the gateway request, a real service may do the same or more advanced logic
  return postClubEntity(club, user);
}

export async function updateClub(clubId: number, club: UpdateClubDto) {
  return putClub(clubId, club);
}

export async function getAllMembers(clubId: number) {
  return await getAllMembersForClub(clubId);
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

export async function getClubById(clubID: number) {
  return await getClub(clubID);
}

export async function exportClubMembers(clubId: number) {
  return await getMembersDataInCSV(clubId);
}

export async function importClubMembers(clubId: number, formData: FormData) {
  return await postMembersDataFromCSV(clubId, formData);
}

export async function fetchMemberForClub(userId: string, clubId: number) {
  return await getMemberForClub(userId, clubId);
}
