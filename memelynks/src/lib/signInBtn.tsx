"use server";

import { signIn, signOut } from "@/auth";

/**
 * Triggers sign-in for the specified provider.
 *
 * @param provider - The authentication provider (e.g., "google", "github").
 * @param callbackUrl - The URL to redirect to after successful login.
 */
export const signInBtn = async (
  provider: string,
  callbackUrl?: string
): Promise<void> => {
  // Fallback to "/account" if callbackUrl is not provided
  await signIn(provider, { callbackUrl: callbackUrl || "/account" });
};

/**
 * Triggers sign-out and redirects to the specified URL after logging out.
 */
export const signOutBtn = async (redirectTo: string = "/") => {
  await signOut({ redirectTo });
};
