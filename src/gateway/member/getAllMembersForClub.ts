import { db } from "../../config/db";
import {eq} from 'drizzle-orm';
import { users } from "@/schemas/authSchema";
import membershipSchema from "@/schemas/membershipSchema";
import clubSchema from "@/schemas/clubSchema";

export type studentData = {
    name: string | null;
    email: string;
    upi: string | null;
    year_of_study: number | null;
    student_id: string | null;
}

export async function getAllMembersForClub(clubId: number) {
    //This is a predefined template for headers based on what is shown on the table
    let headers = ["name", "email", "upi", "year_of_study", "student_id"]
    const membersData = await db.select({
        name: users.name, 
        email: users.email, 
        upi: users.upi, 
        year_of_study :users.year_of_study, 
        student_id: users.student_id
    })
    .from(membershipSchema)
    .leftJoin(users,eq(membershipSchema.user, users.id))
    .leftJoin(clubSchema, eq(membershipSchema.club, clubSchema.id))
    .where(eq(clubSchema.id,clubId)) as studentData[];

    if(membersData.length > 0) {
        headers = Object.keys(membersData[0]);
    }

    return {headers, membersData};
}


