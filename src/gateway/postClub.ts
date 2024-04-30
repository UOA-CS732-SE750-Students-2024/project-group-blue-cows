import "server-only";
import { db } from "../config/db";
import clubSchema, { Club } from "@/schemas/clubSchema";
import { AppUser } from "@/schemas/authSchema";
import { postMember } from "./postMember";

export async function postClubEntity(club: Club, user: AppUser) {
  try {
    const response = await db
      .insert(clubSchema)
      .values([
        {
          name: club.name,
          description: club.description,
          membership_fee: club.membership_fee,
          logo: club.logo,
          category: club.category,
        },
      ])
      .returning({ insertedId: clubSchema.id });
    const clubId = response.at(0)?.insertedId;
    if (clubId) {
      await postMember(clubId, user, true, true);
    }
  } catch (error) {
    return "Failed to insert club into database";
  }
}
