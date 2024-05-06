import { db } from "../config/db";
import { eq } from "drizzle-orm";
import optionsFormSchema from "@/schemas/extendedFormFieldSchema";

// removes an extended field from a clubs signup form
export async function deleteExtendedFormField(optionsId: number) {
  return await db
    .delete(optionsFormSchema)
    .where(eq(optionsFormSchema.id, optionsId));
}
