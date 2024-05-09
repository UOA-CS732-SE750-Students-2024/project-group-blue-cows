import { GetFormFieldInputDto } from "@/Dtos/formFieldInput/GetFormFieldInputDto";
import FormFieldSchema from "@/schemas/FormFieldSchema";
import formFieldInputSchema from "@/schemas/formFieldInputSchema";
import { eq } from "drizzle-orm";
import { db } from "../../config/db";

export async function getFormFieldInputs(
  userId: string
): Promise<GetFormFieldInputDto[]> {
  const formFieldInputs = await db
    .select({ name: FormFieldSchema.name, value: formFieldInputSchema.value })
    .from(formFieldInputSchema)
    .leftJoin(
      FormFieldSchema,
      eq(formFieldInputSchema.formFieldId, FormFieldSchema.id)
    )
    .where(eq(formFieldInputSchema.userId, userId));

  return formFieldInputs.map((formFieldInput): GetFormFieldInputDto => {
    if (!formFieldInput.name) throw new Error("name failed to return");
    return {
      fieldName: formFieldInput.name,
      value: formFieldInput.value,
    };
  });
}
