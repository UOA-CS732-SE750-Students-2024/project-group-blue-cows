import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import formFieldInputSchema from "./formFieldInputSchema";
import membershipSchema from "./membershipSchema";

export interface DataAuthorisation {
  id: number;
  memberId: number;
  formFieldInputId: number;
}

// The fields will grow as we add additional features
export default pgTable("user_data_authorisations", {
  id: serial("id").primaryKey(),
  memberId: integer("memberId")
    .notNull()
    .references(() => membershipSchema.id, { onDelete: "cascade" }),
  formFieldInputId: integer("formFieldInputId")
    .notNull()
    .references(() => formFieldInputSchema.id),
});
