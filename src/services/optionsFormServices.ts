"use server";
import "server-only";
import { PostExtendedFormFieldDto } from "@/Dtos/PostExtendedFormFieldDto";
import { postExtendedFormField } from "@/gateway/postExtendedFormField";
import { getExtendedFormForClub } from "@/gateway/getExtendedFormForClub";
import { deleteExtendedFormField } from "@/gateway/deleteExtendedFormField";
import { PutExtendedFormFieldDto } from "@/Dtos/PutExtendedFormFieldDto";
import { putExtendedFormField } from "@/gateway/putExtendedFormField";
import { GetExtendedFormFieldDto } from "@/Dtos/GetExtendedFormFieldDto";

// export async function addAdditionalFieldToForm(
//   formInput: PostExtendedFormFieldDto,
// ) {
//   return postExtendedFormField(formInput);
// }

// AlexHope I only used this function - you can delete the others and replace with the API in the SaveFormButton component :)
export async function getAllExtendedFields(
  clubId: number,
): Promise<GetExtendedFormFieldDto[]> {
  const extendedFields = await getExtendedFormForClub(clubId);
  return extendedFields.toSorted((a, b) => a.order - b.order);
}

// export async function removeExtendedFieldForForm(optionsId: number) {
//   return deleteExtendedFormField(optionsId);
// }

// export async function updateFormField(
//   optionsFormId: number,
//   updatedForm: PutExtendedFormFieldDto,
// ) {
//   return putExtendedFormField(optionsFormId, updatedForm);
// }
