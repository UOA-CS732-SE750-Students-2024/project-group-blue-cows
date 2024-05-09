import { users } from "@/schemas/authSchema";
import membershipSchema from "@/schemas/membershipSchema";
import { getUserAuthentication } from "@/util/auth";
import { and, eq, ne } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";
import { getMemberForClub } from "./getMemberForClub";

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
    const currentUser = await getUserAuthentication();
    if (!currentUser.id) throw new Error("user has no Id");
    const memberStatus = (await getMemberForClub(currentUser.id, clubId))
      ?.isAdmin;
    if (!memberStatus) throw new Error("member not admin");
    await db
      .delete(membershipSchema)
      .where(
        and(
          eq(membershipSchema.club, clubId),
          ne(membershipSchema.user, currentUser.id)
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
