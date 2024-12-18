import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const publicRoutes = [
    "/login",
    "/login/password-recover",
    "/signup",
    "/reset-password",
    "/health",
  ];

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    if (accessToken?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!accessToken?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
