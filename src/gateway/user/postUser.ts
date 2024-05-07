import { db } from "../../config/db";
import { users } from "@/schemas/authSchema";

export interface postUserDto{
    name: string | null,
    email: string,
    upi: string | null,
    year_of_study: number | null,
    student_id: string | null,
}

export async function postUser(
  user: postUserDto
) {
  try {
    const result = await db.insert(users).values([user]).returning({insertedId: users.id});
    return result.at(0)?.insertedId
} catch (error) {
  throw new Error("Problem with creating a new user")
}
}
