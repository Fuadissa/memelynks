import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Github from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Nodemailer from "next-auth/providers/nodemailer";
import client from "./lib/db"; // Your MongoDB client
// import { User } from "./lib/models/UserSchema"; // Your Mongoose User schema
// import mongoose from "mongoose"; // Mongoose for model operations


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google,
    Twitter,
    Github,
    Nodemailer({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  callbacks: {
    // Handle user sign-in logic
    // Sign-in callback to ensure user details are updated

    // Customize the session object
    async session({ session, token }) {
      session.user.id = token.id as string; // Type assertion to string
      session.user.provider = token.provider as string; // Type assertion to string
      session.user.providerId = token.providerId as string; // Type assertion to string
      return session;
    },

    // Customize the JWT token
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = user.id as string; // Ensure `user.id` is cast to string
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
});
