import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import { students } from "../../db/schema.mjs";
import * as schema from "../../db/migrate.mjs";
const sql = neon(process.env.DATABASE_URL!);
neonConfig.fetchConnectionCache = true;
const db = drizzle(sql, { schema });

export async function getStudents() {
  return await db.select().from(students);
}
