import { db } from "../config/db";
import { PostExtendedFormFieldDto } from "@/dtos/PostExtendedFormFieldDto";
import optionsFormSchema from "@/schemas/extendedFormFieldSchema";

// extends the feilds for the club sign up form
export async function postExtendedFormField(
  formInput: PostExtendedFormFieldDto
) {
  try {
    await db.insert(optionsFormSchema).values([formInput]);
  } catch (error) {
    return "Failed to insert optionsForm into database";
  }
}
