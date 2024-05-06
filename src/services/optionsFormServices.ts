"use server";
import "server-only";
import { PostExtendedFormFieldDto } from "@/Dtos/PostExtendedFormFieldDto";
import { postExtendedFormField } from "@/gateway/postExtendedFormField";
import { getExtendedFormForClub } from "@/gateway/getExtendedFormForClub";
import { deleteExtendedFormField } from "@/gateway/deleteExtendedFormField";
import { PutExtendedFormFieldDto } from "@/Dtos/PutExtendedFormFieldDto";
import { putExtendedFormField } from "@/gateway/putExtendedFormField";

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
