import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, usersTable } from "@/lib/database";

import { CustomSession, CustomToken } from "@/types/types";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { eq } from "drizzle-orm";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, credentials.identifier));

          if (user.length === 0) {
            throw new Error("incorrect email");
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user[0].password as string
          );

          if (!isValidPassword) {
            throw new Error("incorrect password");
          }

          return user[0];
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
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
  pages: {
    signIn: "/sign-in",
  },
};
