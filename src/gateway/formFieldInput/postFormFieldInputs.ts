import { PostFormFieldInputDto } from "@/Dtos/formFieldInput/PostFormFieldInputDto";
import formFieldInputSchema from "@/schemas/formFieldInputSchema";
import "server-only";
import { db } from "../../config/db";
import { postDataAuthorisation } from "../dataAuthorisation/postDataAuthorisation";
import { getExtendedFormByName } from "../extendedFormField/getExtendedFormByName";
import { postExtendedFormField } from "../extendedFormField/postExtendedFormField";
import { getMemberForClub } from "../member/getMemberForClub";
import { postMember } from "../member/postMember";
import { getFormFieldInput } from "./getFormFieldInput";
import { putFormFieldInput } from "./putFormFieldInput";

// inputs data for a user for different form fields
export async function postFormFieldInputs(
  formInputs: PostFormFieldInputDto[],
  clubId: number,
  userId: string
) {
  try {
    // return membership id for respective club and user
    let membershipId = (await getMemberForClub(userId, clubId))?.id;

    // if user is not a member of the club yet, then it makes them a member
    if (!membershipId) {
      membershipId = await postMember({
        club: clubId,
        user: userId,
        paid: false,
        isAdmin: false,
      });
    }

    // check if the post succedded
    if (!membershipId)
      throw new Error("failed to Retrieve or Create membership for User");

    // goes through each individual formFieldInput in a members formFieldInputs
    formInputs.forEach(async (formInput) => {
      // returns the Id for the formField and formFieldInput tables
      let inputId = (await getFormFieldInput(formInput.fieldName, userId))?.id;
      let fieldId = await getExtendedFormByName(formInput.fieldName);

      // if formField does not exist create formField
      if (!fieldId) {
        fieldId = await postExtendedFormField({ name: formInput.fieldName });
      }

      if (!fieldId) throw Error("failed to post form field");

      // if user already has input data for given formField then simply give club
      // access to the data, and update formFieldInput with inputted value
      if (inputId) {
        postDataAuthorisation(
          {
            club: clubId,
            user: userId,
            inputId: inputId,
          },
          membershipId
        );
        putFormFieldInput(fieldId.id, userId, { value: formInput.value });

        // if user has not previously input data then create new entry in
        // formFieldInputs table, and grant the club access to the data
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

        postDataAuthorisation(
          {
            club: clubId,
            user: userId,
            inputId: inputId,
          },
          membershipId
        );
      }
    });
  } catch (error) {
    throw new Error("Failed to insert formFieldsInput into database");
  }
}

