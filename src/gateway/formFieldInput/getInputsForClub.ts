import { db } from "../../config/db";
import { eq } from "drizzle-orm";
import { GetInputsForClubDto } from "@/Dtos/formFieldInput/GetInputsForClubDto";
import membershipSchema from "@/schemas/membershipSchema";
import { getFormFieldInputs } from "./getFormFieldInputs";

export async function getInputsForClub(
  clubId: number
): Promise<GetInputsForClubDto[]> {
  const users = await db
    .select({ userId: membershipSchema.user })
    .from(membershipSchema)
    .where(eq(membershipSchema.club, clubId));

  const returns = users.map(async (user) => {
    const formFieldInputs = await getFormFieldInputs(user.userId);
    return {
      userId: user.userId,
      formFieldInputs: formFieldInputs,
    };
  });
  return Promise.all(returns);
}
