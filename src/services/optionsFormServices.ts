"use server";
import "server-only";
import { PostExtendedFormFieldDto } from "@/Dtos/PostExtendedFormFieldDto";
import { postExtendedFormField } from "@/gateway/extendedFormField/postExtendedFormField";
import { getExtendedFormForClub } from "@/gateway/extendedFormField/getExtendedFormForClub";
import { deleteExtendedFormField } from "@/gateway/extendedFormField/deleteExtendedFormField";
import { PutExtendedFormFieldDto } from "@/Dtos/PutExtendedFormFieldDto";
import { putExtendedFormField } from "@/gateway/extendedFormField/putExtendedFormField";

export async function addAdditionalFieldToForm(
  formInput: PostExtendedFormFieldDto
) {
  return postExtendedFormField(formInput);
}

export async function getAllExtendedFields(clubId: number) {
  return getExtendedFormForClub(clubId);
}

export async function removeExtendedFieldForForm(optionsId: number) {
  return deleteExtendedFormField(optionsId);
}

export async function updateFormField(
  optionsFormId: number,
  updatedForm: PutExtendedFormFieldDto
) {
  return putExtendedFormField(optionsFormId, updatedForm);
}
