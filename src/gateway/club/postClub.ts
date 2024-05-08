import { CreateClubDto } from "@/Dtos/club/CreateClubDto";
import { AppUser } from "@/schemas/authSchema";
import clubSchema from "@/schemas/clubSchema";
import "server-only";
import { db } from "../../config/db";
import { postMember } from "../member/postMember";

export async function postClubEntity(club: CreateClubDto, user: AppUser) {
  try {
    const response = await db
      .insert(clubSchema)
      .values([club])
      .returning({ insertedId: clubSchema.id });
    const clubId = response.at(0)?.insertedId;
    if (clubId) {
      await postMember({
        club: clubId,
        user: user.id,
        paid: true,
        isAdmin: true,
      });
    }
  } catch (error) {
    return "Failed to insert club into database";
  }
}
