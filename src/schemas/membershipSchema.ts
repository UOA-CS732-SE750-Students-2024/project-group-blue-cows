import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./authSchema";
import clubSchema from "./clubSchema";

export interface Membership {
  id: number;
  club: number;
  user: string;
  paid: boolean;
  isAdmin: boolean;
}

// The fields will grow as we add additional features
export default pgTable("memberships", {
  id: serial("id").primaryKey(),
  club: integer("club")
    .notNull()
    .references(() => clubSchema.id, { onDelete: "cascade" }),
  user: text("user")
    .notNull()
    .references(() => users.id),
  paid: boolean("paid").notNull(),
  isAdmin: boolean("isAdmin").notNull(),
});
