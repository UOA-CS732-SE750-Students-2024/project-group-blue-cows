import { db } from "../../config/db";
import { asc, eq } from "drizzle-orm";
import imagesSchema from "@/schemas/imagesSchema";

// gets all the images from a clubs gallery
export async function getGalleryImagesForClub(clubId: number) {
  return await db
    .select()
    .from(imagesSchema)
    .where(eq(imagesSchema.clubId, clubId));
} 
