import { db } from "../../config/db";
import { and, eq } from "drizzle-orm";
import formFieldInputSchema from "@/schemas/formFieldInputSchema";
import formFieldSchema from "@/schemas/FormFieldSchema";

export async function getFormFieldInput(fieldName: string, userId: string) {
  const response = (
    await db
      .select({ id: formFieldSchema.id })
      .from(formFieldSchema)
      .where(eq(formFieldSchema.name, fieldName))
  ).at(0);
  if (!response) return undefined;
  const results = await db
    .select({ id: formFieldInputSchema.id, value: formFieldInputSchema.value })
    .from(formFieldInputSchema)
    .where(
      and(
        eq(formFieldInputSchema.formFieldId, response.id),
        eq(formFieldInputSchema.userId, userId)
      )
    );
  if (results.length > 1) {
    throw new Error("More than one input data for user found");
  }

  return results.at(0);
}
