import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  const pathName = request.nextUrl.pathname;

  if (pathName === "/" || pathName === "/sign-in" || pathName === "/sign-up") {
    return NextResponse.next();
  }

  if (token) {
    return NextResponse.next();
  }

  if (
    !token &&
    (pathName.startsWith("/myPosts") ||
      pathName.startsWith("/write") ||
      pathName.startsWith("/allPosts") ||
      pathName.startsWith("/category") ||
      pathName.startsWith("/posts"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/myPosts/:path*",
    "/write",
    "/allPosts/:path*",
    "/category/:path*",
    "/posts/:path*",
    "/sign-in",
    "/sign-up",
    "/",
  ],
};
