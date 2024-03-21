import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  year_of_study: integer("year_of_study"),
});
