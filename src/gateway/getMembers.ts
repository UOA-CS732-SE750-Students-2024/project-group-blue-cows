import "server-only";
import { db } from "../config/db";
import {eq, and, sql} from 'drizzle-orm';
import { users } from "@/schemas/authSchema";
import membershipSchema from "@/schemas/membershipSchema";
import clubSchema from "@/schemas/clubSchema";

async function getAllMembersForClub(clubId: number) {
    const resultOne = await db.select()
    .from(membershipSchema)
    .leftJoin(users,eq(membershipSchema.user, users.id))
    .leftJoin(clubSchema, eq(membershipSchema.club, clubSchema.id))
    .where(eq(clubSchema.id,clubId))
}

export async function getMembers(name?:string, upi?: string) {
    return await db.select().from(users).where(and(
        eq()
    )) 
}

db.select()
.from(membershipSchema)
.leftJoin(users,eq(membershipSchema.user, users.id))
.leftJoin(clubSchema, eq(membershipSchema.club, clubSchema.id))
.where(eq(clubSchema.id,clubId))