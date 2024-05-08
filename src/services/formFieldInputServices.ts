"use server";
import "server-only";
import { postFormFieldInputs } from "@/gateway/formFieldInput/postFormFieldInputs";
import { PostFormFieldInputDto } from "@/Dtos/formFieldInput/PostFormFieldInputDto";
import { getFormFieldInput } from "@/gateway/formFieldInput/getFormFieldInput";
import { getFormFieldInputs } from "@/gateway/formFieldInput/getFormFieldInputs";
import { getInputsForClub } from "@/gateway/formFieldInput/getInputsForClub";

export async function addFormInputs(
  formInputs: PostFormFieldInputDto[],
  clubId: number,
  userId: string
) {
  return postFormFieldInputs(formInputs, clubId, userId);
}

export async function getFieldInputForUser(fieldName: string, userId: string) {
  return getFormFieldInput(fieldName, userId);
}

export async function getAllFieldInputsForUser(userId: string) {
  return getFormFieldInputs(userId);
}

export async function getAllFieldInputsForClub(clubId: number) {
  return getInputsForClub(clubId);
}
