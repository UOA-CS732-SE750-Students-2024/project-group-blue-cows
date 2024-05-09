import { GetClubFormFieldDto } from "@/Dtos/clubFormField/GetClubFormFieldDto";
import clubFormFieldSchema from "@/schemas/clubFormFieldSchema";
import { error } from "console";
import "server-only";
import { db } from "../../config/db";
import { getExtendedFormByName } from "../extendedFormField/getExtendedFormByName";
import { postExtendedFormField } from "../extendedFormField/postExtendedFormField";
import { deleteClubFormFields } from "./deleteClubFormFields";

// extends the fields for the club sign up form
export async function PostClubFormFields(
  formInputs: GetClubFormFieldDto[],
  clubId: number
) {
  try {
    await deleteClubFormFields(clubId);
    const formInsert = await Promise.all(
      formInputs.map(async (formInput, index) => {
        let fieldId = await getExtendedFormByName(formInput.name);
        if (!fieldId) {
          fieldId = await postExtendedFormField({ name: formInput.name });
        }
        if (!fieldId) throw error;
        return {
          clubId,
          formFieldId: fieldId.id,
          order: index,
          type: formInput.type,
          description: formInput.description,
        };
      })
    );
    await db.insert(clubFormFieldSchema).values(formInsert);
  } catch (error) {
    return "Failed to insert clubFormFields into database";
  }
}
