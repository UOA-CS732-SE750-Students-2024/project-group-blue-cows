import { AppUser, users } from "@/schemas/authSchema";
import "server-only";
import { db } from "../../config/db";

export async function getUsers() {
  return (await db.select().from(users)) as AppUser[];
}
