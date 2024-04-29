import "server-only";
import { db } from "../config/db";
import clubSchema, { Club } from "@/schemas/clubSchema";
import {sql} from 'drizzle-orm';

export async function getClubs(name:string, filter?: string) {
    let filterBuilder = sql``
    if(filter) {
        filterBuilder = sql`${clubSchema.category} = ${filter} and ${clubSchema.name} LIKE ${name}%`
    }    
    else {
        filterBuilder = sql`${clubSchema.name} LIKE ${name}%`
    }
    return await db.select().from(clubSchema).where(filterBuilder) as Club[]
}

