import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const handler = NextAuth({
  providers: [
    Providers.Google({
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // You can customize the sign-in process here
      return true;
    },
    async redirect(url, baseUrl) {
      // You can customize the redirect process here
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  // Add any other NextAuth options you need
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res);
};
export { handler as GET, handler as POST };
