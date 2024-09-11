import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  const pathName = request.nextUrl.pathname;

  if (token) {
    return NextResponse;
  }
  if (
    (!token && pathName.startsWith("/myPosts")) ||
    pathName.startsWith("/write")
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse;
}

export const config = {
  matcher: [
    "/myPosts",
    "/write",
    "/posts/:path*",
    "allPosts",
    "/sign-in",
    "category/:path*",
  ],
};
