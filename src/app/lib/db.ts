import { db } from "@/db/config";
import { students } from "@/db/schema";

export async function getStudents() {
  return await db.select().from(students);
}
