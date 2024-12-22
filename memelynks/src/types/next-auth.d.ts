// src/types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider: string;
      providerId: string;
      name?: string;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
    provider: string;
    providerId: string;
  }
}
