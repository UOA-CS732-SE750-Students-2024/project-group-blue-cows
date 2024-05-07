import { pgTable, serial, integer, varchar, text } from "drizzle-orm/pg-core";

export interface FormExtension {
  id: number;
  name: string;
}

export default pgTable("form_extensions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});