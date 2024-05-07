"use server";
import "server-only";
import { postClubEntity } from "@/gateway/club/postClub";
import { getAllMembersForClub } from "@/gateway/member/getAllMembersForClub";
import { postMember } from "@/gateway/member/postMember";
import { PostMemberDto } from "@/Dtos/member/PostMemberDto";
import { putMember } from "@/gateway/member/putMember";
import { getClubs } from "@/gateway/club/getClubs";
import { CreateClubDto } from "@/Dtos/club/CreateClubDto";
import { UpdateClubDto } from "@/Dtos/club/UpdateClubDto";
import { AppUser } from "@/schemas/authSchema";
import { PutMemberDto } from "@/Dtos/member/PutMemberDto";
import { getClub } from "@/gateway/club/getClub";
import { putClub } from "@/gateway/club/putClub";
import { getMembersDataInCSV } from "@/gateway/member/getMembersDataInCsv";
import { postMembersDataFromCSV } from "@/gateway/member/postMembersDataFromCsv";
import { getMemberForClub } from "@/gateway/member/getMemberForClub";

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
