"use server";
import "server-only";
import { PostClubFormFields } from "@/gateway/clubFormField/postClubFormFields";
import { getClubFormFields } from "@/gateway/clubFormField/getClubFormFields";
import { GetClubFormFieldDto } from "@/Dtos/clubFormField/GetClubFormFieldDto";

export async function updateForm(
  formInput: GetClubFormFieldDto[],
  clubId: number
) {
  return PostClubFormFields(formInput, clubId);
}

export async function getAllExtendedFields(clubId: number) {
  return getClubFormFields(clubId)
}
