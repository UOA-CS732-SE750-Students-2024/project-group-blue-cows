import membershipSchema from "@/schemas/membershipSchema";
import { and, eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

export async function deleteMember(clubId: number, userId: string) {
  try {
    await db
      .delete(membershipSchema)
      .where(
        and(
          eq(membershipSchema.club, clubId),
          eq(membershipSchema.user, userId)
        )
      );
  } catch (error) {
    return "Failed to delete membership in database";
  }
}
