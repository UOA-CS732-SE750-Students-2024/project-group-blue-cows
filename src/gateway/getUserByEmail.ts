import { db } from "../config/db";
import { users, AppUser } from "@/schemas/authSchema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const user = await db.select().from(users).where(eq(users.email, email));

  if (user.length > 1) {
    throw new Error("More than one club with the same ID found.");
  }

  if (user.length === 0) {
    return null;
  }

  return user[0] as AppUser;
}
