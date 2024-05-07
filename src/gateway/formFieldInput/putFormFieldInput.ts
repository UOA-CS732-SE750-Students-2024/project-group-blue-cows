import membershipSchema from "@/schemas/membershipSchema";
import { db } from "../../config/db";
import { and, eq } from "drizzle-orm";
import { PutMemberDto } from "@/Dtos/member/PutMemberDto";
import formFieldInputSchema from "@/schemas/formFieldInputSchema";
import { PutFormFieldInputDto } from "@/Dtos/formFieldInput/PutFormFieldInputDto";

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
