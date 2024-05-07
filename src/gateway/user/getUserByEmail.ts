import { db } from "../../config/db";
import { users, AppUser } from "@/schemas/authSchema";
import { eq } from "drizzle-orm";
import { studentData } from "../member/getAllMembersForClub";

export interface studentDataWithId extends studentData {
  id: string;
}

export async function getUserByEmail(email: string) {
  const user = await db.select({
    id: users.id,
    name: users.name, 
    email: users.email, 
    upi: users.upi, 
    year_of_study :users.year_of_study, 
    student_id: users.student_id
 }).from(users).where(eq(users.email, email));

  if (user.length > 1) {
    throw new Error("More than one user with the same email found.");
  }

  else if(user.length === 0) {
    return null;
  }

  return user[0] as studentDataWithId;
}
