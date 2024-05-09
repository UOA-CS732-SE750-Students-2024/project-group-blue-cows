import { PostExtendedFormFieldDto } from "@/Dtos/extendedFormField/PostExtendedFormFieldDto";
import extendedFormFieldSchema from "@/schemas/FormFieldSchema";
import { error } from "console";
import "server-only";
import { db } from "../../config/db";

// creates a form field type
export async function postExtendedFormField(
  formInput: PostExtendedFormFieldDto
) {
  try {
    const results = (
      await db
        .insert(extendedFormFieldSchema)
        .values(formInput)
        .returning({ id: extendedFormFieldSchema.id })
    ).at(0);
    if (!results) throw error;
    return results;
  } catch (error) {
    console.log("Failed to insert optionsForm into database", error);
  }
}
