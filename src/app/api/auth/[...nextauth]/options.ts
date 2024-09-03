import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/database";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { CustomSession, CustomToken } from "@/types/types";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async jwt({ token, user }): Promise<CustomToken> {
      if (user) {
        token.id = user.id?.toString();
      }
      return token;
    },
    async session({ session, token }): Promise<CustomSession> {
      if (token) {
        session.user = {
          id: token.id,
          name: session.user.name || null,
          email: session.user.email || null,
          image: session.user.image || null,
        } as CustomSession["user"];
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  httpOptions: {
    timeout: 10000, // Increase the timeout to 10 seconds
  },
};
