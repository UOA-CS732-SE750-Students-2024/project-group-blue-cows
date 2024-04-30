import membershipSchema from "@/schemas/membershipSchema";
import { AppUser } from "@/schemas/authSchema";
import { db } from "../config/db";

export async function postMember(
  clubId: number,
  user: AppUser,
  isPaid: boolean,
  isAdmin: boolean
) {
  await db.insert(membershipSchema).values([
    {
      club: clubId,
      user: user.id,
      paid: isPaid,
      isAdmin: isAdmin,
    },
  ]);
}
