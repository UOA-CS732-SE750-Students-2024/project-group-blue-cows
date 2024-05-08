import { UpdateClubDto } from "@/Dtos/club/UpdateClubDto";
import clubSchema from "@/schemas/clubSchema";
import { eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

export async function putClub(clubId: number, club: UpdateClubDto) {
  try {
    await db.update(clubSchema).set(club).where(eq(clubSchema.id, clubId));
  } catch (error) {
    return "Failed to update club into database";
  }
}
