"use server";
import "server-only";
import { GetExtendedFormFieldDto } from "@/Dtos/GetExtendedFormFieldDto";
import { PostExtendedFormFieldDto } from "@/Dtos/extendedFormField/PostExtendedFormFieldDto";
import { postExtendedFormField } from "@/gateway/extendedFormField/postExtendedFormField";
import { getExtendedFormForClub } from "@/gateway/extendedFormField/getExtendedFormForClub";
import { deleteExtendedFormField } from "@/gateway/extendedFormField/deleteExtendedFormField";
import { PutExtendedFormFieldDto } from "@/Dtos/extendedFormField/PutExtendedFormFieldDto";
import { putExtendedFormField } from "@/gateway/extendedFormField/putExtendedFormField";

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
