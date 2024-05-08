import { PostDataAuthorisationDto } from "@/Dtos/dataAuthorisation/PostDataAuthorisationDto";
import userDataAuthorisedSchema from "@/schemas/userDataAuthorisedSchema";
import "server-only";
import { db } from "../../config/db";
import { getMemberForClub } from "../member/getMemberForClub";
import { postMember } from "../member/postMember";
import { getDataAuthorisation } from "./getDataAuthorisation";

export async function postDataAuthorisation(
  dataAuthorisation: PostDataAuthorisationDto
) {
  try {
    let membershipId = (
      await getMemberForClub(dataAuthorisation.user, dataAuthorisation.club)
    )?.id;
    if (!membershipId) {
      membershipId = await postMember({
        club: dataAuthorisation.club,
        user: dataAuthorisation.user,
        paid: false,
        isAdmin: false,
      });
    }
    if (!membershipId) throw new Error("failed to Post");
    if (await getDataAuthorisation(membershipId, dataAuthorisation.inputId))
      throw new Error("data authorisation already exists");
    await db.insert(userDataAuthorisedSchema).values({
      memberId: membershipId,
      formFieldInputId: dataAuthorisation.inputId,
    });
  } catch (error) {
    return "Failed to insert membership into database";
  }
}
