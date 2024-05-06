import membershipSchema from "@/schemas/membershipSchema";
import { db } from "../config/db";
import { and, eq } from "drizzle-orm";
import { putMemberDto } from "@/Dtos/putMemberDto";

export async function putMember(
  clubId: number,
  userId: string,
  membership: putMemberDto
) {
  try {
  await db
    .update(membershipSchema)
    .set(membership)
    .where(
      and(eq(membershipSchema.club, clubId), eq(membershipSchema.user, userId))
    );
  
} catch (error) {
  return "Failed to update membership in database";
}
}
