import { PutFormFieldInputDto } from "@/Dtos/formFieldInput/PutFormFieldInputDto";
import formFieldInputSchema from "@/schemas/formFieldInputSchema";
import { and, eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

export async function putFormFieldInput(
  fieldId: number,
  userId: string,
  formFieldInput: PutFormFieldInputDto
) {
  try {
    await db
      .update(formFieldInputSchema)
      .set(formFieldInput)
      .where(
        and(
          eq(formFieldInputSchema.formFieldId, fieldId),
          eq(formFieldInputSchema.userId, userId)
        )
      );
  } catch (error) {
    return "Failed to update membership in database";
  }
}
