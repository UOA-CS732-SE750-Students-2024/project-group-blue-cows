import { db } from "../../config/db";
import { PostSocialDto } from "@/Dtos/PostSocialDto";
import socialsSchema from "@/schemas/socialsSchema";

// adds a link to a clubs socials
export async function postSocial(
  socialDto : PostSocialDto
) {
  try {
    await db.insert(socialsSchema).values([socialDto]);
  } catch (error) {
    return "Failed to insert link into database";
  }
}