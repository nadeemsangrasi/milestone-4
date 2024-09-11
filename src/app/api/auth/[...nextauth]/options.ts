import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/database";

import { CustomSession, CustomToken } from "@/types/types";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: AdapterUser;
    }): Promise<CustomToken> {
      if (user) {
        token.id = user.id?.toString();
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomToken;
    }): Promise<CustomSession> {
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
};
