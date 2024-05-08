"use server";
import { PostFormFieldInputDto } from "@/Dtos/formFieldInput/PostFormFieldInputDto";
import { postFormFieldInputs } from "@/gateway/formFieldInput/postFormFieldInputs";
import "server-only";

export async function addFormInputs(
  formInputs: PostFormFieldInputDto[],
  clubId: number,
  userId: string
) {
  return postFormFieldInputs(formInputs, clubId, userId);
}
