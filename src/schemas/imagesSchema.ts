import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import clubSchema from "./clubSchema";

export interface Image {
  id: number;
  clubId: number;
  imageUrl: string;
  title: string;
}

export default pgTable("images", {
  id: serial("id").primaryKey(),
  clubId: integer("clubId")
    .notNull()
    .references(() => clubSchema.id, { onDelete: "cascade" }),
  imageUrl: varchar("imageUrl").notNull(),
  title: text("title"),
});
