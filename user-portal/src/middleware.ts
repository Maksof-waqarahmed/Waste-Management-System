import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value || "";
  const path = req.nextUrl.pathname;

  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/email-verification",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  const isPublicPath = publicPaths.some((publicPath) =>
    path.startsWith(publicPath)
  );

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isPublicPath && !token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
