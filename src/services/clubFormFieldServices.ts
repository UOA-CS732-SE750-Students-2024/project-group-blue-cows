"use server";
import { GetClubFormFieldDto } from "@/Dtos/clubFormField/GetClubFormFieldDto";
import { getClubFormFields } from "@/gateway/clubFormField/getClubFormFields";
import { PostClubFormFields } from "@/gateway/clubFormField/postClubFormFields";
import { validateExtendedFieldInputs } from "@/util/csvClientUtils";
import { revalidatePath } from "next/cache";
import "server-only";

export async function updateForm(
  formInput: GetClubFormFieldDto[],
  clubId: number
) {
  revalidatePath(`/clubs/${clubId}/register/edit`);
  await validateExtendedFieldInputs(formInput);
  return PostClubFormFields(formInput, clubId);
}

export async function getAllExtendedFields(clubId: number) {
  revalidatePath(`/clubs/${clubId}/register`);
  return getClubFormFields(clubId);
}
