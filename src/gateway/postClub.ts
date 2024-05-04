import "server-only";
import { db } from "../config/db";
import clubSchema, { Club } from "@/schemas/clubSchema";
import { AppUser } from "@/schemas/authSchema";
import { postMember } from "./postMember";

export async function postClubEntity(club: Club, user: AppUser) {
  try {
    const response = await db
      .insert(clubSchema)
      .values([club])
      .returning({ insertedId: clubSchema.id });
    const clubId = response.at(0)?.insertedId;
    if (clubId) {
      await postMember({club: clubId, user: user.id, paid: true, isAdmin: true});
    }
  } catch (error) {
    return "Failed to insert club into database";
  }
}