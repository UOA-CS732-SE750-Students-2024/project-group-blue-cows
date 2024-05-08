import clubSchema from "@/schemas/clubSchema";
import membershipSchema from "@/schemas/membershipSchema";
import { and, eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

export async function getClubsForAdmin(userId: string) {
  return await db
    .select({
      clubId: clubSchema.id,
      imageUrl: clubSchema.logo,
      name: clubSchema.name,
      category: clubSchema.category,
    })
    .from(clubSchema)
    .leftJoin(membershipSchema, eq(membershipSchema.club, clubSchema.id))
    .where(
      and(eq(membershipSchema.user, userId), eq(membershipSchema.isAdmin, true))
    );
}
