import "server-only";
import { db } from "../config/db";
import { eq } from "drizzle-orm";
import clubSchema from "@/schemas/clubSchema";
import { UpdateClubDto } from "@/Dtos/UpdateClubDto";

export async function putClub(clubId: number, club: UpdateClubDto) {
  try {
    await db
      .update(clubSchema)
      .set(club)
      .where(eq(clubSchema.id, clubId));
  } catch (error) {
    return "Failed to update club into database";
  }
}