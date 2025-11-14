// /middleware.ts
import NextAuth from "next-auth";
import authConfig from "../auth.config";
const { auth } = NextAuth(authConfig);

import {
  apiAuthPrefix,
  apiPublicPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes
} from "../routes";

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiPublicRoute = nextUrl.pathname.startsWith(apiPublicPrefix);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);


  if (isApiAuthRoute || isApiPublicRoute) return null;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // if (pathname.startsWith("/admin") && (!isLoggedIn || !isAdmin)) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  if (!isLoggedIn && !isPublicRoute) return Response.redirect(new URL("/login", nextUrl));

  return null;
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
