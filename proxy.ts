import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {

    const { pathname, origin } = request.nextUrl;

    if(pathname === "/login") {
        return NextResponse.next();
    }
    const sessionToken = request.cookies.get("session")?.value;

    if(!sessionToken) {
        return NextResponse.redirect(new URL("/login", origin));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};