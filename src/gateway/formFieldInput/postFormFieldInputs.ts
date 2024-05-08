import { db } from "../../config/db";
import { getExtendedFormByName } from "../extendedFormField/getExtendedFormByName";
import { postExtendedFormField } from "../extendedFormField/postExtendedFormField";
import { PostFormFieldInputDto } from "@/Dtos/formFieldInput/PostFormFieldInputDto";
import formFieldInputSchema from "@/schemas/formFieldInputSchema";
import { getFormFieldInput } from "./getFormFieldInput";
import { putFormFieldInput } from "./putFormFieldInput";
import { postDataAuthorisation } from "../dataAuthorisation/postDataAuthorisation";

// inputs data for a user for different form fields
export async function postFormFieldInputs(
  formInputs: PostFormFieldInputDto[],
  clubId: number,
  userId: string
) {
  try {
    formInputs.forEach(async (formInput) => {
      let inputId = (await getFormFieldInput(formInput.fieldName, userId))?.id;
      let fieldId = await getExtendedFormByName(formInput.fieldName);
      if (!fieldId) {
        fieldId = await postExtendedFormField({ name: formInput.fieldName });
      }
      if (!fieldId) throw Error("failed to post form field");
      if (inputId) {
        postDataAuthorisation({
          club: clubId,
          user: userId,
          inputId: inputId,
        });
        putFormFieldInput(fieldId.id, userId, { value: formInput.value });
      } else {
        inputId = (
          await db
            .insert(formFieldInputSchema)
            .values({
              formFieldId: fieldId.id,
              userId: userId,
              value: formInput.value,
            })
            .returning({ id: formFieldInputSchema.id })
        ).at(0)?.id;

        if (!inputId) throw new Error("failed to create new input data");
        postDataAuthorisation({
          club: clubId,
          user: userId,
          inputId: inputId,
        });
      }
    });
  } catch (error) {
    throw new Error("Failed to insert formFieldsInput into database");
  }
}
