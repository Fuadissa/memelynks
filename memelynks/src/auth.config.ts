// `auth.config.ts`
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Github from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [Google, Twitter, Github],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.provider = token.provider as string;
      session.user.providerId = token.providerId as string;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = user.id as string;
        token.provider = account.provider;
        token.providerId = account.providerAccountId;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // Use JWT sessions
  },
  secret: process.env.AUTH_SECRET, // Required for JWT signing
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
};

export default authConfig;
