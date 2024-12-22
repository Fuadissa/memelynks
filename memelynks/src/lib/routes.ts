export const LOGIN = "/login";
export const ROOT = "/";

export const PUBLIC_ROUTES: string[] = [
  "/login",
  "/api/auth/callback/google",
  "/api/auth/callback/twitter",
  "/api/auth/callback/github",
];

export const PROTECTED_SUB_ROUTES: string[] = ["/account", "/analytics"];
