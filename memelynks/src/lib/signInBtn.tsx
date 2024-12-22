"use server";

import { signIn, signOut } from "@/auth";
/**
 * Triggers sign-in for the specified provider.
 *
 * @param provider - The authentication provider (e.g., "google", "github").
 */

export const signInBtn = async (provider: string): Promise<void> => {
  await signIn(provider, { callbackUrl: "/account" });
};

export const signOutBtn = async () => {
  await signOut({ redirectTo: "/" });
};
