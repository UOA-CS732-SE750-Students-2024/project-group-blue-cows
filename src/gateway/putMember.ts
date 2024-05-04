import membershipSchema from "@/schemas/membershipSchema";
import { db } from "../config/db";
import { and, eq } from "drizzle-orm";

export async function putMember(
  clubId: number,
  userId: string,
  isPaid: boolean,
  isAdmin: boolean
) {
  await db
    .update(membershipSchema)
    .set({
      paid: isPaid,
      isAdmin: isAdmin,
    })
    .where(
      and(eq(membershipSchema.club, clubId), eq(membershipSchema.user, userId))
    );
}
