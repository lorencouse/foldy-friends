// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import admin from "./pages/firebase-admin"; // Adjust the path as needed

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const decodedClaims = await admin
        .auth()
        .verifySessionCookie(session.value);

      if (decodedClaims.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error verifying session:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
