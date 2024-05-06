import { db } from "../config/db";
import { PostExtendedFormFieldDto } from "@/Dtos/PostExtendedFormFieldDto";
import entendedFormFieldSchema from "@/schemas/extendedFormFieldSchema";

// extends the feilds for the club sign up form
export async function postExtendedFormField(
  formInput: PostExtendedFormFieldDto
) {
  try {
    await db.insert(entendedFormFieldSchema).values([formInput]);
  } catch (error) {
    return "Failed to insert optionsForm into database";
  }
}
