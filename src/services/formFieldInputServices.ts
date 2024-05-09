"use server";
import { PostFormFieldInputDto } from "@/Dtos/formFieldInput/PostFormFieldInputDto";
import { getFormFieldInput } from "@/gateway/formFieldInput/getFormFieldInput";
import { getFormFieldInputs } from "@/gateway/formFieldInput/getFormFieldInputs";
import { getInputsForClub } from "@/gateway/formFieldInput/getInputsForClub";
import { postFormFieldInputs } from "@/gateway/formFieldInput/postFormFieldInputs";
import { getUserAuthenticationAdmin } from "@/gateway/helper/getUserAuthenticationAdmin";
import { getUserisUser } from "@/gateway/helper/getUserIsUser";
import "server-only";

export async function addFormInputs(
  formInputs: PostFormFieldInputDto[],
  clubId: number,
  userId: string
) {
  await getUserisUser(userId); // checks if current user is inputted user
  return postFormFieldInputs(formInputs, clubId, userId);
}

export async function getFieldInputForUser(fieldName: string, userId: string) {
  await getUserisUser(userId); // checks if current user is inputted user
  return getFormFieldInput(fieldName, userId);
}

export async function getAllFieldInputsForUser(userId: string) {
  await getUserisUser(userId); // checks if current user is inputted user
  return getFormFieldInputs(userId);
}

export async function getAllFieldInputsForClub(clubId: number) {
  await getUserAuthenticationAdmin(clubId); // checks that current user is admin for given club
  return getInputsForClub(clubId);
}
