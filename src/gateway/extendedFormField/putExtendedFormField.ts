import { db } from "../../config/db";
import { eq } from "drizzle-orm";
import { PutExtendedFormFieldDto } from "@/Dtos/PutExtendedFormFieldDto";
import optionsFormSchema from "@/schemas/extendedFormFieldSchema";

//  updates one of the extended fields for the club sign up
export async function putExtendedFormField(
  optionsFormId: number,
  updatedForm: PutExtendedFormFieldDto
) {
  try {
    await db
      .update(optionsFormSchema)
      .set(updatedForm)
      .where(eq(optionsFormSchema.id, optionsFormId));
  } catch (error) {
    return "Failed to update optionsForm in database";
  }
}
