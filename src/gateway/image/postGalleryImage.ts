import { PostGalleryImageDto } from "@/Dtos/image/PostGalleryImageDto";
import imagesSchema from "@/schemas/imagesSchema";
import "server-only";
import { db } from "../../config/db";

// adds a image to a clubs gallery
export async function postGalleryImage(imageDto: PostGalleryImageDto) {
  try {
    await db.insert(imagesSchema).values([imageDto]);
  } catch (error) {
    return "Failed to insert image into database";
  }
}
