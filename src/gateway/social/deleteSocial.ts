import socialsSchema from "@/schemas/socialsSchema";
import { eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

// removes link from a club
export async function deleteSocial(socialId: number) {
  return await db.delete(socialsSchema).where(eq(socialsSchema.id, socialId));
}
