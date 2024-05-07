import { db } from "../../config/db";
import { asc, eq } from "drizzle-orm";
import optionsFormSchema from "@/schemas/extendedFormFieldSchema";
import { PostExtendedFormFieldDto } from "@/Dtos/extendedFormField/PostExtendedFormFieldDto";

// gets all the extended fields of a form for a specified club
export async function getExtendedFormForClub(
  clubId: number,
): Promise<PostExtendedFormFieldDto[]> {
  return await db
    .select()
    .from(optionsFormSchema)
    .where(eq(optionsFormSchema.clubId, clubId))
    .orderBy(asc(optionsFormSchema.order));
}
