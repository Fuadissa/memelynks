// `middleware.ts`
import { NextResponse, NextRequest } from "next/server";
import authConfig from "@/auth.config"; // No database adapter for edge
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default async function middleware(req: NextRequest) {
  const reqUrl = new URL(req.url);

  // Authenticate using NextAuth
  const session = await auth();

  // Redirect to login if not authenticated and not on the homepage
  if (!session && reqUrl?.pathname !== "/" && reqUrl?.pathname !== "/login") {
    return NextResponse.redirect(
      new URL(
        `/login?callbackUrl=${encodeURIComponent(reqUrl.pathname)}`,
        req.url
      )
    );
  }

  // Redirect to account if authenticated and visiting the login page
  if (session && reqUrl?.pathname === "/login") {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}
