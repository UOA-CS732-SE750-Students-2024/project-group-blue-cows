import { db } from "../../config/db";
import { and, eq } from "drizzle-orm";
import userDataAuthorisedSchema from "@/schemas/userDataAuthorisedSchema";

export async function getDataAuthorisation(memberId: number, inputId: number) {
  const results = await db
    .select()
    .from(userDataAuthorisedSchema)
    .where(
      and(
        eq(userDataAuthorisedSchema.memberId, memberId),
        eq(userDataAuthorisedSchema.formFieldInputId, inputId)
      )
    );
  if (results.length > 1) {
    throw new Error(
      "More than one dataAuthorisation for the same Member exists."
    );
  }

  return results.at(0);
}
