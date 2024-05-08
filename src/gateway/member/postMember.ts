import { PostMemberDto } from "@/Dtos/member/PostMemberDto";
import membershipSchema from "@/schemas/membershipSchema";
import "server-only";
import { db } from "../../config/db";
import { getMemberForClub } from "./getMemberForClub";

export async function postMember(member: PostMemberDto) {
  try {
    if (await getMemberForClub(member.user, member.club))
      throw new Error("membership already exists");
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
