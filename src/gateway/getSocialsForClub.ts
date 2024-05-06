import { db } from "../config/db";
import { asc, eq } from "drizzle-orm";
import socialsSchema from "@/schemas/socialsSchema";

// gets all links for a club
export async function getSocialsForClub(clubId: number) {
  return await db
    .select()
    .from(socialsSchema)
    .where(eq(socialsSchema.clubId, clubId));
}
