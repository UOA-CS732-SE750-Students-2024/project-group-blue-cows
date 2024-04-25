import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import clubSchema from "./clubSchema";
import { users } from "./authSchema";

// The fields will grow as we add additional features
export default pgTable("memberships", {
  id: serial("id").primaryKey(),
  club: integer("club")
    .notNull()
    .references(() => clubSchema.id),
  user: text("user")
    .notNull()
    .references(() => users.id),
  paid: boolean("paid").notNull(),
  isAdmin: boolean("isAdmin").notNull(),
});
