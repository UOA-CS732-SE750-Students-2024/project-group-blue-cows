import { pgTable, serial, integer, varchar, text } from "drizzle-orm/pg-core";
import optionsFormSchema from "./optionsFormSchema";
import memberships from "./membershipSchema";

export interface FormInput {
  id: number;
  membershipId: number;
  formOptionId: number;
  value: string;
}

export const formInput = pgTable("formInput", {
  id: serial("id").primaryKey(),
  membershipId: text("membershipId")
    .notNull()
    .references(() => memberships.id),
  formOptionId: integer("formOptionId")
  .notNull()
  .references(() => optionsFormSchema.id),
  value: text("value").notNull()
});