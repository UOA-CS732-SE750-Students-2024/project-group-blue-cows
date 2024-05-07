import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import membershipSchema from "./membershipSchema";
import formFieldInputSchema from "./formFieldInputSchema";

export interface DataAuthorisation {
  id: number;
  memberId: number;
  formFieldInputId: number

}

// The fields will grow as we add additional features
export default pgTable("user_data_authorisations", {
  id: serial("id").primaryKey(),
  memberId: integer("memberId")
    .notNull()
    .references(() => membershipSchema.id,  { onDelete: "cascade" }),
    formFieldInputId: integer("formFieldInputId")
    .notNull()
    .references(() => formFieldInputSchema.id),
});
