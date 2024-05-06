"use server";
import "server-only";
import { postClubEntity } from "@/gateway/postClub";
import { getAllMembersForClub } from "@/gateway/getAllMembersForClub";
import { postMember, postMemberDto } from "@/gateway/postMember";
import { putMember } from "@/gateway/putMember";
import { getClubs } from "@/gateway/getClubs";
import { Club, CreateClubDto, UpdateClubDto } from "@/schemas/clubSchema";
import { AppUser } from "@/schemas/authSchema";
import {  putMemberDto} from "@/gateway/putMember";
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

export async function addMember(
  member: postMemberDto
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
