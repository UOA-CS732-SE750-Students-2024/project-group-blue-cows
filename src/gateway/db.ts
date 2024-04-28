import "server-only";
import { db } from "../config/db";
import students from "@/schemas/studentSchema";
import { users, AppUser } from "@/schemas/authSchema";

export async function getUsersDemo() {
  return (await db.select().from(users)) as AppUser[];
}
