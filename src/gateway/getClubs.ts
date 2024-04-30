import "server-only";
import { db } from "../config/db";
import clubSchema, { Club } from "@/schemas/clubSchema";
import { sql } from "drizzle-orm";

export async function getClubsUnfiltered(name: string) {
  return (await db
    .select()
    .from(clubSchema)
    .where(sql`${clubSchema.name} LIKE ${name}%`)) as Club[];
}

export async function getClubsFiltered(name: string) {
  return (await db
    .select()
    .from(clubSchema)
    .where(sql`${clubSchema.name} LIKE ${name}%`)) as Club[];
}