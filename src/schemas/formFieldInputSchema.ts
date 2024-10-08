import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import formFieldSchema from "./FormFieldSchema";
import { users } from "./authSchema";

export interface FormInput {
  id: number;
  userId: number;
  formFieldId: number;
  value: string;
}

export default pgTable("form_inputs", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  formFieldId: integer("formFieldId")
    .notNull()
    .references(() => formFieldSchema.id),
  value: text("value").notNull(),
});
