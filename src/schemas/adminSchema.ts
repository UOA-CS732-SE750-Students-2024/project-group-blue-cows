import {pgTable, text, serial } from "drizzle-orm/pg-core";

// The fields will grow as we add additional features
export default pgTable("admins", {
  id: serial("id").primaryKey(),
  club: integer("club").notNull().references(() => clubSchema.id),
  user: text("user").notNull().references(() => userSchema.id)
});