"use server";
import { PostGalleryImageDto } from "@/Dtos/image/PostGalleryImageDto";
import { getUserAuthenticationAdmin } from "@/gateway/helper/getUserAuthenticationAdmin";
import { deleteGalleryImage } from "@/gateway/image/deleteGalleryImage";
import { getGalleryImagesForClub } from "@/gateway/image/getGalleryImagesForClub";
import { postGalleryImage } from "@/gateway/image/postGalleryImage";
import { revalidatePath } from "next/cache";
import "server-only";

export async function addImageToGallery(imageDto: PostGalleryImageDto, clubId: number) {
  await getUserAuthenticationAdmin(clubId); // checks that current user is admin for given club
  revalidatePath(`/clubs/${clubId}/admin`);
  return postGalleryImage(imageDto);
}

export async function removeImageFromGallery(imageId: number) {
  return deleteGalleryImage(imageId);
}

export async function getAllImagesForClub(clubId: number) {
  return getGalleryImagesForClub(clubId);
}
