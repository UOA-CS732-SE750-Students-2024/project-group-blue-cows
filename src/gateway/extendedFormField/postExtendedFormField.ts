import { db } from "../../config/db";
import { PostExtendedFormFieldDto } from "@/Dtos/extendedFormField/PostExtendedFormFieldDto";
import entendedFormFieldSchema from "@/schemas/extendedFormFieldSchema";
import { deleteExtendedFormField } from "./deleteExtendedFormField";

// extends the feilds for the club sign up form
export async function postExtendedFormField(
  formInput: PostExtendedFormFieldDto[]
) {
  try {
    const clubId = formInput.at(0)?.clubId
    if (!clubId) return "ClubId not defined"
    await deleteExtendedFormField(clubId)
    await db.insert(entendedFormFieldSchema).values(formInput);
  } catch (error) {
    return "Failed to insert optionsForm into database";
  }
}
