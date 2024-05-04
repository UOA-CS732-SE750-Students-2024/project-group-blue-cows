import NextAuth, { User } from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/config/db";
import { AppUser, users } from "@/schemas/authSchema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      // Check that there actually is a user and that the user has an id
      if (!user || !user.id) {
        return session;
      }

      // Now grab the user from the DB
      const result = await db.select().from(users).where(eq(users.id, user.id));
      const dbUser = result[0] as AppUser;

      // If the user is not in the DB, return the session as is
      if (!dbUser) {
        return session;
      }

      // Otherwise, add the user to the session
      session.user = dbUser as AppUser;

      return session;
    },
  },
});
