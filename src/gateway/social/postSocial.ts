import { PostSocialDto } from "@/Dtos/social/PostSocialDto";
import socialsSchema from "@/schemas/socialsSchema";
import "server-only";
import { db } from "../../config/db";

// adds a link to a clubs socials
export async function postSocial(socialDto: PostSocialDto) {
  try {
    return (
      await db
        .insert(socialsSchema)
        .values([socialDto])
        .returning({ id: socialsSchema.id })
    ).at(0)?.id;
  } catch (error) {
    throw new Error("Failed to insert link into database");
  }
}
