"use server";
import { postClubEntity } from "@/gateway/postClub";
import "server-only";
import { Club } from "@/schemas/clubSchema";
import { AppUser } from "@/schemas/authSchema";

export async function postClub(club: Club, user: AppUser) {
  // All this does is proxy the gateway request, a real service may do the same or more advanced logic
  return postClubEntity(club, user);
}
