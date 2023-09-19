import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { CALENDAR_API } from "@/config/CALENDAR";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: CALENDAR_API.CLIENT_ID || "",
      clientSecret: CALENDAR_API.CLIENT_SECRET || "",
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.id = token.sub!;
      }

      return session;
    },
  },
};
