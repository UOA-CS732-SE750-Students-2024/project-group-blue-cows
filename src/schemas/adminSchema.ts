import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import clubSchema from "./clubSchema";
import userSchema from "./userSchema";

// The fields will grow as we add additional features
export default pgTable("admins", {
  id: serial("id").primaryKey(),
  club: integer("club")
    .notNull()
    .references(() => clubSchema.id),
  user: text("user")
    .notNull()
    .references(() => userSchema.id),
});
