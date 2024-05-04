import membershipSchema from "@/schemas/membershipSchema";
import { db } from "../config/db";

export interface postMemberDto{
  club: number;
  user: string;
  paid: boolean;
  isAdmin: boolean;
}

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
