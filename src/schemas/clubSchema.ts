import { numeric, pgTable, text, serial, varchar } from "drizzle-orm/pg-core";


export interface Club {
  id: number;
  name: string;
  description: string;
  membership_fee: string;
  logo: string;
  category: string;
}

// The fields will grow as we add additional features
export default pgTable("clubs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // clubs might have the same name across organizations
  description: text("description").notNull(), // this will need to be expanded, depending on what information we want to display
  membership_fee: numeric("membership_fee", {
    precision: 4,
    scale: 2,
  }).notNull(), // storing a money amount of up to 99.99
  logo: varchar("logo").notNull(),
  category: text("category").notNull(),
});
