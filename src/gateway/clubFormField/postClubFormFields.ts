import { db } from "../../config/db";
import clubFormFieldSchema from "@/schemas/clubFormFieldSchema";
import { deleteClubFormFields } from "./deleteClubFormFields";
import { PostClubFormFieldDto } from "@/Dtos/clubFormField/PostClubFormFieldDto";
import { getExtendedFormByName } from "../extendedFormField/getExtendedFormByName";
import { postExtendedFormField } from "../extendedFormField/postExtendedFormField";
import { error } from "console";

// extends the feilds for the club sign up form
export async function PostClubFormFields( 
  formInputs: PostClubFormFieldDto[]
) {
  try {
    const clubId = formInputs.at(0)?.clubId
    if (!clubId) return "ClubId not defined"
    await deleteClubFormFields(clubId)

    const formInsert = await Promise.all(formInputs.map(async formInput => { 
      let fieldId = await getExtendedFormByName(formInput.name)
      if (!fieldId){
        fieldId = await postExtendedFormField({name: formInput.name})
      }
      if (!fieldId) throw error
       return {
        clubId: formInput.clubId, 
        formFieldId: fieldId.id,
        order: formInput.order,
        type: formInput.type,
        description: formInput.description
      }
    }));
    await db.insert(clubFormFieldSchema).values(formInsert);
  } catch (error) {
    return "Failed to insert clubFormFields into database";
  }
}
