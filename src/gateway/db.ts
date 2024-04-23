import "server-only";
import { db } from "../config/db";
import students from "@/schemas/studentSchema";

export async function getStudents() {
  return await db.select().from(students);
}
