import { db } from "../config/db";
import { users } from "@/schemas/authSchema";

export interface studentData{
    name: string | null,
    email: string,
    upi: string | null,
    year: number | null,
    studentId: string | null,
}

export async function postUser(
  user: studentData
) {
  try {
    const result = await db.insert(users).values([user]).returning({insertedId: users.id});
    return result.at(0)?.insertedId
} catch (error) {
  throw new Error("Problem with creating a new user")
}
}
