import { db } from "../config/db";
import {eq} from 'drizzle-orm';
import { users } from "@/schemas/authSchema";
import membershipSchema from "@/schemas/membershipSchema";
import clubSchema from "@/schemas/clubSchema";

export type studentData = {
    name: string | null;
    email: string | null;
    upi: string | null;
    year: number | null;
    studentId: string | null;
}

export async function getAllMembersForClub(clubId: number) {
    const results = await db.select({
        name: users.name, 
        email: users.email, 
        upi: users.upi, 
        year:users.year_of_study, 
        studentId: users.student_id
    })
    .from(membershipSchema)
    .leftJoin(users,eq(membershipSchema.user, users.id))
    .leftJoin(clubSchema, eq(membershipSchema.club, clubSchema.id))
    .where(eq(clubSchema.id,clubId)) as studentData[];
    return results;
}


