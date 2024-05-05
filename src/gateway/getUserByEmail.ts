import { db } from "../config/db";
import { users, AppUser } from "@/schemas/authSchema";
import { eq } from "drizzle-orm";
import { studentData } from "./getAllMembersForClub";

export async function getUserByEmail(email: string) {
  const user = await db.select({
    name: users.name, 
    email: users.email, 
    upi: users.upi, 
    year:users.year_of_study, 
    studentId: users.student_id
 }).from(users).where(eq(users.email, email));

  if (user.length > 1) {
    throw new Error("More than one user with the same email found.");
  }

  else if(user.length === 0) {
    return null;
  }

  return user[0] as studentData;
}
