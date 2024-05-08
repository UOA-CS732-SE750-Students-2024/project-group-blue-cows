import { PutSocialDto } from "@/Dtos/social/PutSocialDto";
import socialsSchema from "@/schemas/socialsSchema";
import { eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

// updates a link for a clubs socials
export async function putSocial(socialId: number, socialDto: PutSocialDto) {
  try {
    await db
      .update(socialsSchema)
      .set(socialDto)
      .where(eq(socialsSchema.id, socialId));
  } catch (error) {
    return "Failed to update link in database";
  }
}
