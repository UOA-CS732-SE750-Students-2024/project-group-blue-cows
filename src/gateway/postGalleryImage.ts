import { db } from "../config/db";
import { PostGalleryImageDto } from "@/Dtos/PostGalleryImageDto";
import imagesSchema from "@/schemas/imagesSchema";

// adds a image to a clubs gallery
export async function postGalleryImage(
  imageDto : PostGalleryImageDto
) {
  try {
    await db.insert(imagesSchema).values([imageDto]);
  } catch (error) {
    return "Failed to insert image into database";
  }
}