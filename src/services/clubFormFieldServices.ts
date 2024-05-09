"use server";
import { GetClubFormFieldDto } from "@/Dtos/clubFormField/GetClubFormFieldDto";
import { getClubFormFields } from "@/gateway/clubFormField/getClubFormFields";
import { PostClubFormFields } from "@/gateway/clubFormField/postClubFormFields";
import { getUserAuthenticationAdmin } from "@/gateway/helper/getUserAuthenticationAdmin";
import { validateExtendedFieldInputs } from "@/util/csvClientUtils";
import { revalidatePath } from "next/cache";
import "server-only";

export async function updateForm(
  formInput: GetClubFormFieldDto[],
  clubId: number
) {
  revalidatePath(`/clubs/${clubId}/register/edit`);
  validateExtendedFieldInputs(formInput);
  await getUserAuthenticationAdmin(clubId); // checks that current user is admin for given club
  return PostClubFormFields(formInput, clubId);
}

export async function getAllExtendedFields(clubId: number) {
  revalidatePath(`/clubs/${clubId}/register`);
  return getClubFormFields(clubId);
}
