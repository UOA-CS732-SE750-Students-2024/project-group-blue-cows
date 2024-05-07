import { pgTable, serial, integer, varchar, text } from "drizzle-orm/pg-core";
import clubSchema from "./clubSchema";

export interface FormExtension {
  id: number;
  clubId: number;
  order: number;
  name: string;
  type: string;
  description?: string;
}

export default pgTable("formExtension", {
  id: serial("id").primaryKey(),
  clubId: integer("clubId")
  .notNull()
  .references(() => clubSchema.id,  { onDelete: "cascade" }),
  order: integer("order").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description")
});