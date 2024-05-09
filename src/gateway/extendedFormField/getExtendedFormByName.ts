import extendedFormFieldSchema from "@/schemas/FormFieldSchema";
import { eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

// retrieve an extended form field by name
export async function getExtendedFormByName(name: string) {
  const results = await db
    .select({ id: extendedFormFieldSchema.id })
    .from(extendedFormFieldSchema)
    .where(eq(extendedFormFieldSchema.name, name));
  if (results.length > 1) {
    throw new Error("More than one field with the same name found.");
  }
  return results.at(0);
}
