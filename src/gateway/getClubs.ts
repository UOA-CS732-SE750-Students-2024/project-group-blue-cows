import "server-only";
import { db } from "../config/db";
import clubSchema from "@/schemas/clubSchema";
import {sql} from 'drizzle-orm';

export async function getClubs(name:string) {
    return await db.select().from(clubSchema).where(sql`${clubSchema.name} LIKE ${name}%`);
}

