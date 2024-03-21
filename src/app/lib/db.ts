import { db } from "@/db/config.mjs";
import { students } from "@/db/schema.mjs";

export async function getStudents() {
  return await db.select().from(students);
}
