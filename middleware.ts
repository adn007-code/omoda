import { NextRequest, NextResponse } from "next/server";
import { adminSessionCookie, adminSessionValue } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const session = request.cookies.get(adminSessionCookie)?.value;
  const isLoggedIn = session === adminSessionValue;

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
