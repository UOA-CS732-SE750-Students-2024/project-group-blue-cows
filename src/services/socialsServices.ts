"use server";
import "server-only";
import { PostSocialDto } from "@/Dtos/PostSocialDto";
import { PutSocialDto } from "@/Dtos/PutSocialDto";
import { postSocial } from "@/gateway/postSocial";
import { deleteSocial } from "@/gateway/deleteSocial";
import { getSocialsForClub } from "@/gateway/getSocialsForClub";
import { putSocial } from "@/gateway/putSocial";

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