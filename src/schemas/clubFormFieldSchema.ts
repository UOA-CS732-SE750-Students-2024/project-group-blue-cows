import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import clubSchema from "./clubSchema";
import formFieldSchema from "./FormFieldSchema";

export interface ClubFormField {
  id: number;
  clubId: number;
  formFieldId: number;
  order: number;
  type: string;
  description: string;
}

export default pgTable("club_form_fields", {
  id: serial("id").primaryKey(),
  clubId: integer("clubId")
    .notNull()
    .references(() => clubSchema.id, { onDelete: "cascade" }),
  formFieldId: integer("formFieldId")
    .notNull()
    .references(() => formFieldSchema.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
});
