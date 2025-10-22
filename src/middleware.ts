// /middleware.ts
import { NextResponse } from "next/server";
import authConfig from "../auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT

} from "../routes"

export default auth((req: any) => {
   const { pathname } = req.nextUrl;
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log(req.auth)


  if (isApiAuthRoute) return null;
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
