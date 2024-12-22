import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOGIN, PROTECTED_SUB_ROUTES, PUBLIC_ROUTES, ROOT } from "./lib/routes";

// Middleware to protect routes
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is public
  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) ||
    pathname === ROOT;

  // Fetch the session to check authentication status
  const sessionResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: { cookie: request.headers.get("cookie") || "" },
  });
  const session = await sessionResponse.json();
  const isAuthenticated = !!session?.user;

  // Redirect to "/account" if logged in and visiting "/login"
  if (pathname === LOGIN && isAuthenticated) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  // Redirect to "/login" if accessing protected routes while not authenticated
  const isProtectedRoute = PROTECTED_SUB_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  // Allow access to public routes and authenticated users on protected routes
  return NextResponse.next();
}

// Match all routes for this middleware
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
