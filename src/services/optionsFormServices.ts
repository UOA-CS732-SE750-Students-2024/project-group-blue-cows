"use server";
import "server-only";
import { PostExtendedFormFieldDto } from "@/Dtos/extendedFormField/PostExtendedFormFieldDto";
import { postExtendedFormField } from "@/gateway/extendedFormField/postExtendedFormField";
import { getExtendedFormForClub } from "@/gateway/extendedFormField/getExtendedFormForClub";

export async function updateForm(
  formInput: PostExtendedFormFieldDto[]
) {
  return postExtendedFormField(formInput);
}

export async function getAllExtendedFields(clubId: number) {
  return getExtendedFormForClub(clubId);
}
