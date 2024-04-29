import "server-only";
import { db } from "../config/db";
import clubSchema, { Club } from "@/schemas/clubSchema";
import {eq, sql} from 'drizzle-orm';

export async function getClubs(name:string, filter: string) {
    return await db.select().from(clubSchema).where(eq(clubSchema.category,filter) && (sql`${clubSchema.name} LIKE ${name}%`)) as Club[];
}

