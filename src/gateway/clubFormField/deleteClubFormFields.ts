import clubFormFieldSchema from "@/schemas/clubFormFieldSchema";
import { eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

// removes all extended fields from a clubs signup form
export async function deleteClubFormFields(clubId: number) {
  return await db
    .delete(clubFormFieldSchema)
    .where(eq(clubFormFieldSchema.clubId, clubId));
}
