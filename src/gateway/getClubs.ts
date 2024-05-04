"use server"
import "server-only";
import { db } from "../config/db";
import clubSchema, { Club } from "@/schemas/clubSchema";
import {and, like, eq } from "drizzle-orm";

export async function getClubs(name: string, filter: string | null) {
  if(filter === "All"){
    return await db.select().from(clubSchema).where(like(clubSchema.name, `${name.toUpperCase()}%`)) as Club[];
  }

  else if (filter) {
    return await db.select().from(clubSchema).where(
      and(
        like(clubSchema.name, `${name.toUpperCase()}%`),
        eq(clubSchema.category, filter)
      )) as Club[];
  }

  return await db.select().from(clubSchema).where(like(clubSchema.name, `${name.toUpperCase()}%`)) as Club[];
}
