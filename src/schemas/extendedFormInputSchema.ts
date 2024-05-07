import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import extendedFormFieldSchema from "./extendedFormFieldSchema";
import membershipSchema from "./membershipSchema";

export interface FormInput {
  id: number;
  membershipId: number;
  formOptionId: number;
  value: string;
}

export default pgTable("memberformInput", {
  id: serial("id").primaryKey(),
  membershipId: integer("membershipId")
    .notNull()
    .references(() => membershipSchema.id,  { onDelete: "cascade" }),
  formOptionId: integer("formOptionId")
    .notNull()
    .references(() => extendedFormFieldSchema.id),
  value: text("value").notNull(),
}); 

