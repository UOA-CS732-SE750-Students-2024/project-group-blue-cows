import { db } from "../../config/db";
import { and, eq } from "drizzle-orm";
import membershipSchema from "@/schemas/membershipSchema";

export async function isAdmin(userId: string, clubId: number) {
  const results = await db
    .select({ isAdmin: membershipSchema.isAdmin })
    .from(membershipSchema)
    .where(
      and(eq(membershipSchema.club, clubId), eq(membershipSchema.user, userId))
    );
  if (results.length > 1) {
    throw new Error("More than one membership with the same user ID found.");
  }

  return results.at(0);
}
