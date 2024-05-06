"use server";
import "server-only";
import { postOptionsFormDto } from "@/Dtos/postOptionsFormDto";
import { postOptionsForm } from "@/gateway/postOptionsForm";
import { getOptionsForClub } from "@/gateway/getOptionsForClub";
import { deleteOptionsForm } from "@/gateway/deleteOptionsForm";
import { putOptionsFormDto } from "@/Dtos/putOptionsFormDto";
import { putOptionsForm } from "@/gateway/putOptionsForm";

export async function createOptionForm(formInput: postOptionsFormDto){
    return postOptionsForm(formInput);
}

export async function getAllOptions(clubId: number){
    return getOptionsForClub(clubId);
}

export async function removeOptionsForm(optionsId: number){
    return deleteOptionsForm(optionsId);
}

export async function updateOptionsForm(optionsFormId: number,
    updatedForm: putOptionsFormDto){
        return putOptionsForm(optionsFormId, updatedForm);
    }