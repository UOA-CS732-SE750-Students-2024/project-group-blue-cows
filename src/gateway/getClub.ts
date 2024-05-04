import { db } from "@/config/db";
import clubs, { Club } from "@/schemas/clubSchema";
import { eq } from "drizzle-orm";
import "server-only";

export async function getClub(clubID: number) {
  const response = await db.select().from(clubs).where(eq(clubs.id, clubID));

  // Sanity check
  // We should only get one club back
  if (response.length !== 1) {
    throw new Error("Club not found");
  }

  return response[0] as Club;
}
