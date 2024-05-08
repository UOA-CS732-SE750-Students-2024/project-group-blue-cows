import { users } from "@/schemas/authSchema";
import clubSchema from "@/schemas/clubSchema";
import membershipSchema from "@/schemas/membershipSchema";
import { asc, eq } from "drizzle-orm";
import "server-only";
import { db } from "../../config/db";

export type studentData = {
  name: string | null;
  email: string;
  upi: string | null;
  year_of_study: number | null;
  student_id: string | null;
  paid: boolean;
  isAdmin: boolean;
};

export async function getAllMembersForClub(clubId: number) {
  //This is a predefined template for headers based on what is shown on the table
  let headers = [
    "name",
    "email",
    "upi",
    "year_of_study",
    "student_id",
    "paid",
    "isAdmin",
  ];
  const membersData = (await db
    .select({
      name: users.name,
      email: users.email,
      upi: users.upi,
      year_of_study: users.year_of_study,
      student_id: users.student_id,
      paid: membershipSchema.paid,
      isAdmin: membershipSchema.isAdmin,
    })
    .from(membershipSchema)
    .leftJoin(users, eq(membershipSchema.user, users.id))
    .leftJoin(clubSchema, eq(membershipSchema.club, clubSchema.id))
    .where(eq(clubSchema.id, clubId))
    .orderBy(asc(users.name))) as studentData[];

  return { headers, membersData };
}
