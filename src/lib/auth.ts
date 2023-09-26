import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { CALENDAR_API } from "@/config/CALENDAR";

const prisma = new PrismaClient();

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
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
    async signIn({ user }) {
      try {
        let userId = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!userId) {
          const newUser = { id: user.id, name: user.name!, email: user.email! };
          userId = await prisma.user.create({
            data: newUser,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
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
