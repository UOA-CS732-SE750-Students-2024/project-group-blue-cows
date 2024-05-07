import { db } from "@/config/db";
import clubs, { Club } from "@/schemas/clubSchema";
import { eq } from "drizzle-orm";
import "server-only";

export async function getClub(clubID: number) {
  const response = await db.select().from(clubs).where(eq(clubs.id, clubID));

  // Sanity check
  // We should only never get more than one club back
  if (response.length > 1) {
    throw new Error("More than one club with the same ID found.");
  }

  if (response.length === 0) {
    // Return null and handle in the UI if the club doesn't exist
    return null;
  }

  return response[0] as Club;
}
