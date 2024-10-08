import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import clubSchema from "./clubSchema";

export interface Socials {
  id: number;
  clubId: number;
  link: string;
  tag: string;
  type: string;
}

export default pgTable("socials", {
  id: serial("id").primaryKey(),
  clubId: integer("clubId")
    .notNull()
    .references(() => clubSchema.id, { onDelete: "cascade" }),
  link: varchar("link").notNull(),
  tag: text("tag").notNull(),
  type: text("type").notNull(),
});
