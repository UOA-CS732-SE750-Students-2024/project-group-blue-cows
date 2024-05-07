"use server";
import "server-only";
import { PostClubFormFieldDto } from "@/Dtos/clubFormField/PostClubFormFieldDto";
import { PostClubFormFields } from "@/gateway/clubFormField/postClubFormFields";
import { getClubFormFields } from "@/gateway/clubFormField/getClubFormFields";

export async function updateForm(
  formInput: PostClubFormFieldDto[]
) {
  return PostClubFormFields(formInput);
}

export async function getAllExtendedFields(clubId: number) {
  console.log(clubId+"clinet")
  return getClubFormFields(clubId)
}
