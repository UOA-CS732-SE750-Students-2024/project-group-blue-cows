import imagesSchema from "@/schemas/imagesSchema";
import { eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

// gets all the images from a clubs gallery
export async function getGalleryImagesForClub(clubId: number) {
  return await db
    .select()
    .from(imagesSchema)
    .where(eq(imagesSchema.clubId, clubId));
}
