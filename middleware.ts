import { tr } from "date-fns/locale";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { match } from "node:assert";
import path from "node:path";
export default withAuth(
  // Matches the pages config in `[...nextauth]`
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // If there is a token, the user is authenticated
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        )
          return true;
        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }
        if (token) {
          return true; // return !!token; //shortcut *interesting concept
        }
        return false;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
