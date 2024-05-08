"use server";
import { PostSocialDto } from "@/Dtos/social/PostSocialDto";
import { PutSocialDto } from "@/Dtos/social/PutSocialDto";
import { deleteSocial } from "@/gateway/social/deleteSocial";
import { getSocialsForClub } from "@/gateway/social/getSocialsForClub";
import { postSocial } from "@/gateway/social/postSocial";
import { putSocial } from "@/gateway/social/putSocial";
import "server-only";

export async function addSocialLink(socialDto: PostSocialDto) {
  return postSocial(socialDto);
}

export async function removeSocialLink(socialId: number) {
  return deleteSocial(socialId);
}

export async function getAllSocialsForClub(clubId: number) {
  return getSocialsForClub(clubId);
}

export async function updateSocialLink(
  socialId: number,
  socialDto: PutSocialDto
) {
  return putSocial(socialId, socialDto);
}
