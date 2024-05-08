import { db } from "../../config/db";
import { PostDataAuthorisationDto } from "@/Dtos/dataAuthorisation/PostDataAuthorisationDto";
import userDataAuthorisedSchema from "@/schemas/userDataAuthorisedSchema";
import { getMemberForClub } from "../member/getMemberForClub";
import { postMember } from "../member/postMember";

export async function postDataAuthorisation(
  dataAuthorisation: PostDataAuthorisationDto
) {
  try {
    console.log("get", dataAuthorisation);
    let membershipId = (
      await getMemberForClub(dataAuthorisation.user, dataAuthorisation.club)
    )?.id;
    console.log("checkId", membershipId);
    if (!membershipId) {
      console.log("post", dataAuthorisation);
      membershipId = await postMember({
        club: dataAuthorisation.club,
        user: dataAuthorisation.user,
        paid: false,
        isAdmin: false,
      });
    }
    if (!membershipId) throw new Error("failed to Post");
    console.log("insert", membershipId);
    await db.insert(userDataAuthorisedSchema).values({
      memberId: membershipId,
      formFieldInputId: dataAuthorisation.inputId,
    });
  } catch (error) {
    return "Failed to insert membership into database";
  }
}
