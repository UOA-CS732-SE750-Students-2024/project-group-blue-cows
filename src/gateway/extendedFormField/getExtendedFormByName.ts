import { db } from "../../config/db";
import { asc, eq } from "drizzle-orm";
import extendedFormFieldSchema from "@/schemas/FormFieldSchema";

// gets all the extende fields of a form for a specified club
export async function getExtendedFormByName(name: string) {
  
  const results = await db
    .select({id: extendedFormFieldSchema.id})
    .from(extendedFormFieldSchema)
    .where(eq(extendedFormFieldSchema.name, name));
    if (results.length > 1) {
      throw new Error("More than one field with the same name found.");
  }
  return results.at(0);
}
