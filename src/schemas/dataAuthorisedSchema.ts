import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import membershipSchema from "./membershipSchema";
import formFieldInputSchema from "./formFieldInputSchema";

export interface DataAuthorisation {
  id: number;
  memberId: number;
  formFieldInputId: number

}

// The fields will grow as we add additional features
export default pgTable("data_authorisations", {
  id: serial("id").primaryKey(),
  memberId: integer("memberId")
    .notNull()
    .references(() => membershipSchema.id,  { onDelete: "cascade" }),
    formFieldInputId: text("formFieldInputId")
    .notNull()
    .references(() => formFieldInputSchema.id),
});
