import { users } from "@/schemas/authSchema";
import membershipSchema from "@/schemas/membershipSchema";
import { getUserAuthentication } from "@/util/auth";
import { and, eq, ne } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";
import { getUserAuthenticationAdmin } from "../helper/getUserAuthenticationAdmin";

export type studentData = {
  name: string | null;
  email: string;
  upi: string | null;
  year_of_study: number | null;
  student_id: string | null;
  paid: boolean;
  isAdmin: boolean;
};

export async function deleteAllMembers(clubId: number): Promise<studentData[]> {
  try {
    const currentUserId = (await getUserAuthentication()).id;
    if (!currentUserId) throw new Error("unable to find user id");
    await getUserAuthenticationAdmin(clubId);
    await db
      .delete(membershipSchema)
      .where(
        and(
          eq(membershipSchema.club, clubId),
          ne(membershipSchema.user, currentUserId)
        )
      );
    return await db
      .select({
        name: users.name,
        email: users.email,
        upi: users.upi,
        year_of_study: users.year_of_study,
        student_id: users.student_id,
        paid: membershipSchema.paid,
        isAdmin: membershipSchema.isAdmin,
      })
      .from(users)
      .innerJoin(membershipSchema, eq(users.id, membershipSchema.user))
      .where(eq(membershipSchema.club, clubId));
  } catch (error) {
    throw new Error("Failed to delete membership in database" + error);
  }
}
