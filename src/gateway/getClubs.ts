import "server-only";
import { db } from "../config/db";
import clubSchema, { Club } from "@/schemas/clubSchema";
import { SQL, sql } from "drizzle-orm";

export async function getClubs(name: string, filter?: string) {
  let filterBuilder: SQL<string>;
  if (filter) {
    filterBuilder = sql<string>`${clubSchema.category.name} = ${filter} AND ${clubSchema.name.name} LIKE ${name}%`;
  } else {
    filterBuilder = sql<string>`${clubSchema.name.name} LIKE ${name}%`;
  }
  return (await db.select().from(clubSchema)) as Club[];
  // return (await db.select().from(clubSchema).where(filterBuilder)) as Club[];
}
