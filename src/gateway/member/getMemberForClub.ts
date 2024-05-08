import membershipSchema from "@/schemas/membershipSchema";
import { and, eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

export async function getMemberForClub(userId: string, clubId: number) {
  const results = await db
    .select()
    .from(membershipSchema)
    .where(
      and(eq(membershipSchema.club, clubId), eq(membershipSchema.user, userId))
    );
  if (results.length > 1) {
    throw new Error("More than one membership with the same user ID found.");
  }

  return results.at(0);
}
