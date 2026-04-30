import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth")?.value;
  const isAuth = Boolean(token);

  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");

  if (!isAuth && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (isAuth && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
