import { db } from "../../config/db";
import { eq } from "drizzle-orm";
import imagesSchema from "@/schemas/imagesSchema";

// removes an image from a clubs gallery
export async function deleteGalleryImage(imageId: number) {
  return await db
    .delete(imagesSchema)
    .where(eq(imagesSchema.id, imageId));
}
