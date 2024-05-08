import { db } from "../../config/db";
import { and, eq } from "drizzle-orm";
import { GetInputsForClubDto } from "@/Dtos/formFieldInput/GetInputsForClubDto";
import membershipSchema from "@/schemas/membershipSchema";
import { getFormFieldInputs } from "./getFormFieldInputs";
import formFieldInputSchema from "@/schemas/formFieldInputSchema";
import userDataAuthorisedSchema from "@/schemas/userDataAuthorisedSchema";
import FormFieldSchema from "@/schemas/FormFieldSchema";
import { GetFormFieldInputDto } from "@/Dtos/formFieldInput/GetFormFieldInputDto";

export async function getInputsForClub(
  clubId: number
): Promise<GetInputsForClubDto[]> {
  const users = await db
    .select({ userId: membershipSchema.user })
    .from(membershipSchema)
    .where(eq(membershipSchema.club, clubId));

  const returns = users.map(async (user) => {
    const formFieldInputs = await db
      .select({
        fieldName: FormFieldSchema.name,
        value: formFieldInputSchema.value,
      })
      .from(formFieldInputSchema)
      .leftJoin(
        FormFieldSchema,
        eq(formFieldInputSchema.formFieldId, FormFieldSchema.id)
      )
      .leftJoin(
        userDataAuthorisedSchema,
        eq(formFieldInputSchema.id, userDataAuthorisedSchema.formFieldInputId)
      )
      .leftJoin(
        membershipSchema,
        eq(userDataAuthorisedSchema.memberId, membershipSchema.id)
      )
      .where(
        and(
          eq(membershipSchema.club, clubId),
          eq(membershipSchema.user, user.userId)
        )
      );
    const formFieldInputDtos = formFieldInputs.map(
      (formFieldInput): GetFormFieldInputDto => {
        if (!formFieldInput.fieldName) throw new Error("name failed to return");
        return {
          fieldName: formFieldInput.fieldName,
          value: formFieldInput.value,
        };
      }
    );
    return {
      userId: user.userId,
      formFieldInputs: formFieldInputDtos,
    };
  });
  return Promise.all(returns);
}
