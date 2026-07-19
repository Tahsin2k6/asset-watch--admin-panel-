import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { origin } = request.nextUrl;

  const sessionToken = request.cookies.get("session")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/super-admin/:path*",
    "/viewer/:path*",
  ],
};
