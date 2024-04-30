"use server"
import "server-only";
import { db } from "../config/db";
import clubSchema, { Club } from "@/schemas/clubSchema";
import { sql } from "drizzle-orm";

export async function getClubs(name:string, category?: string) {
    let filterBuilder = sql<string>``
    if(category) {
        filterBuilder = sql<string>`${clubSchema.category} = ${category} and ${clubSchema.name} LIKE ${name}%`
    }    
    else {
        filterBuilder = sql<string>`${clubSchema.name} LIKE ${name}%`
    }
    return await db.select().from(clubSchema).where(filterBuilder) as Club[]