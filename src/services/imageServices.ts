"use server";
import "server-only";
import { PostGalleryImageDto } from "@/Dtos/PostGalleryImageDto";
import { postGalleryImage } from "@/gateway/image/postGalleryImage";
import { deleteGalleryImage } from "@/gateway/image/deleteGalleryImage";
import { getGalleryImagesForClub } from "@/gateway/image/getGalleryImagesForClub";

export async function addImageToGallery(imageDto : PostGalleryImageDto){
    return postGalleryImage(imageDto);
}

export async function removeImageFromGallery(imageId: number){
    return deleteGalleryImage(imageId);
}

export async function getAllImagesForClub(clubId: number){
    return getGalleryImagesForClub(clubId);
}