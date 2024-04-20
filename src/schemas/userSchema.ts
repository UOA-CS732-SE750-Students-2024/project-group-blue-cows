import { integer, pgTable, text } from "drizzle-orm/pg-core";

// The fields will grow as we add additional features
export default pgTable("users", {
  id: text("id").primaryKey(), // intention is to use a Firebase user id as the primary key here, however may change depending on auth implementation
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  upi: text("upi"), // nullable for non-student user use case, may not be unique across organisations
  student_id: integer("student_id"), // nullable for non-student user use case, may not be unique across organisations
  year_of_study: integer("year_of_study"), // nullable for non-student user use case
});