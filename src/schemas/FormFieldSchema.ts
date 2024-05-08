import { pgTable, serial, text } from "drizzle-orm/pg-core";

export interface FormFields {
  id: number;
  name: string;
}

export default pgTable("form_fields", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});
