import { db } from "../config/db";
import {and, eq} from 'drizzle-orm';
import membershipSchema from "@/schemas/membershipSchema";

export async function getMemberForClub(userId: string, clubId: number) {
    const results = await db.select().from(membershipSchema).where(and(eq(membershipSchema.club, clubId),  eq(membershipSchema.user, userId)));
    return results;
}
