import { users } from "@/schemas/authSchema";
import membershipSchema from "@/schemas/membershipSchema";
import { and, eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

export async function getAdminsForClub(clubId: number) {
  return await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      upi: users.upi,
      year_of_study: users.year_of_study,
      student_id: users.student_id,
    })
    .from(membershipSchema)
    .leftJoin(users, eq(users.id, membershipSchema.user))
    .where(
      and(eq(membershipSchema.club, clubId), eq(membershipSchema.isAdmin, true))
    );
}
