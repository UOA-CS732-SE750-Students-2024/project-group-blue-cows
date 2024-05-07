import membershipSchema from "@/schemas/membershipSchema";
import { db } from "../../config/db";
import { PostMemberDto } from "@/Dtos/member/PostMemberDto";
import { PostDataAuthorisationDto } from "@/Dtos/dataAuthorisation/PostDataAuthorisationDto";
import userDataAuthorisedSchema from "@/schemas/userDataAuthorisedSchema";
import { getMemberForClub } from "../member/getMemberForClub";
import { postMember } from "../member/postMember";

export async function postDataAuthorisation(
  dataAuthorisation: PostDataAuthorisationDto
) {
  try {
    let membership = (
      await getMemberForClub(dataAuthorisation.user, dataAuthorisation.club)
    )?.id;
    if (!membership) {
      membership = await postMember({
        club: dataAuthorisation.club,
        user: dataAuthorisation.user,
        paid: false,
        isAdmin: false,
      });
    }
    if (!membership) throw new Error("failed to Post");
    await db.insert(userDataAuthorisedSchema).values({
      memberId: membership,
      formFieldInputId: dataAuthorisation.inputId,
    });
  } catch (error) {
    return "Failed to insert membership into database";
  }
}
