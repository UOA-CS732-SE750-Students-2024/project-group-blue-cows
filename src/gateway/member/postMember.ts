import membershipSchema from "@/schemas/membershipSchema";
import { db } from "../../config/db";
import { PostMemberDto } from "@/Dtos/member/PostMemberDto";

export async function postMember(member: PostMemberDto) {
  try {
    return (
      await db
        .insert(membershipSchema)
        .values([member])
        .returning({ id: membershipSchema.id })
    ).at(0)?.id;
  } catch (error) {
    throw new Error("Failed to insert membership into database");
  }
}
