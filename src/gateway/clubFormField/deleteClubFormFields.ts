import { db } from "../../config/db";
import { eq } from "drizzle-orm";
import clubFormFieldSchema from "@/schemas/clubFormFieldSchema";

// removes all extended fields from a clubs signup form
export async function deleteClubFormFields(clubId: number) {
  return await db
    .delete(clubFormFieldSchema)
    .where(eq(clubFormFieldSchema.clubId, clubId));
}
