"use server";
import "server-only";
import { PostSocialDto } from "@/Dtos/social/PostSocialDto";
import { PutSocialDto } from "@/Dtos/social/PutSocialDto";
import { postSocial } from "@/gateway/social/postSocial";
import { deleteSocial } from "@/gateway/social/deleteSocial";
import { getSocialsForClub } from "@/gateway/social/getSocialsForClub";
import { putSocial } from "@/gateway/social/putSocial";

export async function addSocialLink(socialDto : PostSocialDto){
    return postSocial(socialDto);
}

export async function removeSocialLink(socialId: number){
    return deleteSocial(socialId);
}

export async function getAllISocialsForClub(clubId: number){
    return getSocialsForClub(clubId);
}

export async function updateSocialLink(socialId: number, socialDto : PutSocialDto){
    return putSocial(socialId, socialDto);
}