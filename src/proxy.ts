import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  const hasAccessToken = cookieStore.has("accessToken");
  const hasRefreshToken = cookieStore.has("refreshToken");

  // Case 1: Access token exists - allow access
  if (hasAccessToken) {
    return NextResponse.next();
  }

  // Case 2: No tokens at all - redirect to signin
  if (!hasRefreshToken) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Case 3: Only refresh token exists - try to rotate
  try {
    const response = await fetch(`${process.env.BACK_END_URL}/auth/rotate`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Create response with new cookies
    const nextResponse = NextResponse.next();

    const setCookieHeaders = response.headers.getSetCookie();
    setCookieHeaders.forEach((cookie) => {
      nextResponse.headers.append("Set-Cookie", cookie);
    });

    return nextResponse;
  } catch (error) {
    console.error("Token rotation failed:", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
