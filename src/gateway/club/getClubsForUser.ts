import clubSchema from "@/schemas/clubSchema";
import membershipSchema from "@/schemas/membershipSchema";
import { eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

export async function getClubsForUser(userId: string) {
  return await db
    .select({
      clubId: clubSchema.id,
      imageUrl: clubSchema.logo,
      name: clubSchema.name,
      category: clubSchema.category,
    })
    .from(clubSchema)
    .leftJoin(membershipSchema, eq(membershipSchema.club, clubSchema.id))
    .where(eq(membershipSchema.user, userId));
}
