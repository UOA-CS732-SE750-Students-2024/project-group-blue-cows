import { db } from "../config/db";
import { users, AppUser } from "@/schemas/authSchema";

export async function getUsers() {
  return (await db.select().from(users)) as AppUser[];
}
