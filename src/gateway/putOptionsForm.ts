import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { putOptionsFormDto } from "@/Dtos/putOptionsFormDto";
import optionsFormSchema from "@/schemas/optionsFormSchema";

export async function putOptionsForm(
    optionsFormId: number,
    updatedForm: putOptionsFormDto
) {
  try {
  await db.update(optionsFormSchema).set(updatedForm).where(eq(optionsFormSchema.id, optionsFormId))
} catch (error) {
  return "Failed to update optionsForm in database";
}
}