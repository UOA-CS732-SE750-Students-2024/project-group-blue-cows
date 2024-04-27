// This file is based off Auth.js's recommended schemas (they can be found at https://authjs.dev/getting-started/adapters/drizzle)
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  index,
  integer,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";
import { randomUUID } from "crypto";

// This is the user type, it is important to keep it in sync with the user schema in the authentication adapter
// It is called AppUser to differentiate it from the User type define in Auth.js
// The key different is that AppUser has a few more fields that are not required by Auth.js
export interface AppUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  upi: string | null;
  student_id: string | null;
  year_of_study: number | null;
}

// We can add more fields to user as required for additional functionality, it is only important we have everything required for MVP currently
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"), // profile picture
  upi: text("upi"), // UPI, student ID and year of study are optional because they will likely be added after account creation
  student_id: text("student_id"), // text because it ensures all digits are stored, we don't need to do calculations and do not know an official maximum value
  year_of_study: integer("year_of_study"),
});

// Altering these tables could impact authentication/oauth flows, so make changes with care
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    userIdIdx: index().on(account.userId),
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable(
  "session",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    sessionToken: text("sessionToken").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => {
    return {
      userIdIdx: index().on(table.userId),
    };
  }
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
