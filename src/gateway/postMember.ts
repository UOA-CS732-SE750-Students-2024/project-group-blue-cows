import membershipSchema, { Membership } from "@/schemas/membershipSchema";
import { AppUser } from "@/schemas/authSchema";
import { db } from "../config/db";

export async function postMember(
  member: Membership
) {
  try {
  await db.insert(membershipSchema).values([
    member
  ]);
} catch (error) {
  return "Failed to insert membership into database";
}
}
