import { NextResponse, type NextRequest } from "next/server";

const TOKEN_KEY = "token";
const PROTECTED_ROUTES = ["/account", "/checkout"];
const GUEST_ONLY_ROUTES = [
  "/forgot-password",
  "/login",
  "/new-password",
  "/sign-up",
  "/verify-otp",
];

const matchesRoute = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(TOKEN_KEY)?.value;

  if (!token && matchesRoute(pathname, PROTECTED_ROUTES)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnTo", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  if (token && matchesRoute(pathname, GUEST_ONLY_ROUTES)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/checkout/:path*",
    "/forgot-password",
    "/login",
    "/new-password",
    "/sign-up",
    "/verify-otp",
  ],
};
