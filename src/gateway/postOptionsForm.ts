import { db } from "../config/db";
import { postOptionsFormDto } from "@/Dtos/postOptionsFormDto";
import optionsFormSchema from "@/schemas/optionsFormSchema";

export async function postOptionsForm(
  formInput: postOptionsFormDto
) {
  try {
  await db.insert(optionsFormSchema).values([
    formInput
  ]);
} catch (error) {
  return "Failed to insert optionsForm into database";
}
}
