import membershipSchema from "@/schemas/membershipSchema";
import { db } from "../config/db";
import { PostMemberDto } from "@/dtos/PostMemberDto";

export async function postMember(member: PostMemberDto) {
  try {
    await db.insert(membershipSchema).values([member]);
  } catch (error) {
    return "Failed to insert membership into database";
  }
}
