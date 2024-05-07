import { db } from "../../config/db";
import { asc, eq } from "drizzle-orm";
import clubFormFieldSchema from "@/schemas/clubFormFieldSchema";
import extendedFormFieldSchema from "@/schemas/FormFieldSchema";
import { GetClubFormFieldDto } from "@/Dtos/clubFormField/GetClubFormFieldDto";

// gets all the extended fields of a form for a specified club
export async function getClubFormFields(
  clubId: number
): Promise<GetClubFormFieldDto[]> {
  const response = await db
    .select()
    .from(clubFormFieldSchema)
    .leftJoin(
      extendedFormFieldSchema,
      eq(clubFormFieldSchema.formFieldId, extendedFormFieldSchema.id)
    )
    .where(eq(clubFormFieldSchema.clubId, clubId))
    .orderBy(asc(clubFormFieldSchema.order));
  return response.map((formField): GetClubFormFieldDto => {
    if (!formField.form_fields)
      throw new Error("form_fields failed to join onto table");
    return {
      name: formField.form_fields.name,
      type: formField.club_form_fields.type,
      description: formField.club_form_fields.description,
    };
  });
}
