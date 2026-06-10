import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getCurrentUser from "./lib/auth/get-current-user";

export async function proxy(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    const loginUrl = new URL("/prijava", request.url);

    loginUrl.searchParams.set(
      "returnTo",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/urejanje/:path*",
    "/plezalni-dnevnik/:path*",
    "/climbing-log/:path*",
  ],
};
