import "server-only";
import { db } from "../config/db";
import clubSchema, { Club } from "@/schemas/clubSchema";
import membershipSchema from "@/schemas/membershipSchema";
import { AppUser } from "@/schemas/authSchema";

export async function postClubEntity(club: Club, user: AppUser) {
  if (user !== undefined) {
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
    if (clubId !== undefined) {
      await db.insert(membershipSchema).values([
        {
          club: clubId,
          user: user.id,
          paid: true,
          isAdmin: true,
        },
      ]);
    }
  }
}
