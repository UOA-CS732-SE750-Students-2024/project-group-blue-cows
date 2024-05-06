import membershipSchema from "@/schemas/membershipSchema";
import { db } from "../config/db";
import { postMemberDto } from "@/Dtos/postMemberDto";

export async function postMember(
  member: postMemberDto
) {
  try {
  await db.insert(membershipSchema).values([
    member
  ]);
} catch (error) {
  return "Failed to insert membership into database";
}
}
