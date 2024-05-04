import { pgTable, serial, integer, varchar, text } from "drizzle-orm/pg-core";
import optionsFormSchema from "./optionsFormSchema";

export interface FormInput {
  id: number;
  formOptionId: number;
  value: string;
}

export const formInput = pgTable("formInput", {
  id: serial("id").primaryKey(),
  formOptionId: integer("formOptionId")
  .notNull()
  .references(() => optionsFormSchema.id),
  value: text("value").notNull()
});