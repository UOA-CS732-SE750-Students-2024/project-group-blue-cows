"use server";
import "server-only";
import { postFormFieldInputs } from "@/gateway/formFieldInput/postFormFieldInputs";
import { PostFormFieldInputDto } from "@/Dtos/formFieldInput/PostFormFieldInputDto";

export async function addFormInputs(
  formInputs: PostFormFieldInputDto[],
  clubId: number,
  userId: string
) {
  return postFormFieldInputs(formInputs, clubId, userId);
}
