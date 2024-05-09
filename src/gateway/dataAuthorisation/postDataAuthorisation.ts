import { PostDataAuthorisationDto } from "@/Dtos/dataAuthorisation/PostDataAuthorisationDto";
import userDataAuthorisedSchema from "@/schemas/userDataAuthorisedSchema";
import "server-only";
import { db } from "../../config/db";
import { getDataAuthorisation } from "./getDataAuthorisation";

export async function postDataAuthorisation(
  dataAuthorisation: PostDataAuthorisationDto,
  membershipId: number
) {
  try {
    if (await getDataAuthorisation(membershipId, dataAuthorisation.inputId))
      throw new Error("data authorisation already exists");

    await db.insert(userDataAuthorisedSchema).values({
      memberId: membershipId,
      formFieldInputId: dataAuthorisation.inputId,
    });
    console.log("no error for dataAuth");
  } catch (error) {
    return "Failed to insert dataAuth into database";
  }
}
