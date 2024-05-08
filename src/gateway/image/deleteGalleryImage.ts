import imagesSchema from "@/schemas/imagesSchema";
import { eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

// removes an image from a clubs gallery
export async function deleteGalleryImage(imageId: number) {
  return await db.delete(imagesSchema).where(eq(imagesSchema.id, imageId));
}
