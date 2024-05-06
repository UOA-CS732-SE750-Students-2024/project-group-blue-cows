import { db } from "../config/db";
import { eq } from "drizzle-orm";
import optionsFormSchema from "@/schemas/extendedFormFieldSchema";
import { PostExtendedFormFieldDto } from "@/Dtos/PostExtendedFormFieldDto";

// gets all the extended fields of a form for a specified club
export async function getExtendedFormForClub(
  clubId: number,
): Promise<PostExtendedFormFieldDto[]> {
  return await db
    .select()
    .from(optionsFormSchema)
    .where(eq(optionsFormSchema.clubId, clubId));
}
