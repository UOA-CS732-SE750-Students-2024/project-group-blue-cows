import membershipSchema from "@/schemas/membershipSchema";
import { db } from "../../config/db";
import { and, eq, ne } from "drizzle-orm";
import { auth, getUserAuthentication } from "@/util/auth";
import { getMemberForClub } from "./getMemberForClub";

export async function deleteAllMembers(clubId: number) {
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
  } catch (error) {
    return "Failed to delete membership in database";
  }
}
