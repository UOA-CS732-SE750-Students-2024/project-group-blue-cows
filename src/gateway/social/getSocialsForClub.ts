import socialsSchema from "@/schemas/socialsSchema";
import { eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

// gets all links for a club
export async function getSocialsForClub(clubId: number) {
  return await db
    .select()
    .from(socialsSchema)
    .where(eq(socialsSchema.clubId, clubId));
}
