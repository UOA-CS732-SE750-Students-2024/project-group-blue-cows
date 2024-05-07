import { db } from "../../config/db";
import { eq } from "drizzle-orm";
import optionsFormSchema from "@/schemas/extendedFormFieldSchema";

// removes all extended fields from a clubs signup form
export async function deleteExtendedFormField(clubId: number) {
  return await db
    .delete(optionsFormSchema)
    .where(eq(optionsFormSchema.clubId, clubId));
}
