import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPrefixes = [
  "/avatar",
  "/family-tree",
  "/memorials",
  "/store",
  "/donate",
  "/dashboard",
  "/feed",
];

const authRoutes = ["/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  // If user is NOT logged in and tries to access a protected route -> redirect to /login
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is ALREADY logged in and tries to visit login/register -> redirect to /feed
  const isAuthRoute = authRoutes.some((route) => pathname === route);
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/avatar/:path*",
    "/family-tree",
    "/family-tree/:path*",
    "/memorials/:path*",
    "/store/:path*",
    "/donate/:path*",
    "/dashboard/:path*",
    "/feed/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
