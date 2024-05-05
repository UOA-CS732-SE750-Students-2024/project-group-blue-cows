import { db } from "../config/db";
import { users, AppUser } from "@/schemas/authSchema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  return await db.select().from(users).where(eq(users.email, email)) as AppUser[];
}
