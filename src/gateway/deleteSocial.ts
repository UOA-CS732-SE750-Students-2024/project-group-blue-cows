import { db } from "../config/db";
import { eq } from "drizzle-orm";
import socialsSchema from "@/schemas/socialsSchema";

// removes link from a club
export async function deleteSocial(socialId: number) {
  return await db
    .delete(socialsSchema)
    .where(eq(socialsSchema.id, socialId));
}
