import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import authConfig from "./auth.config"
import { userService } from "./services"

declare module "next-auth" {
  interface User {
    role?: "admin" | "user";
  }
  interface Session {
    user: {
      id: string;
      role?: "admin" | "user";
    } & DefaultSession["user"];
  }
}


export const { auth, handlers, signIn, signOut } = NextAuth({
  pages:{
    signIn: "/login",
    error:"/error"
  },
  events: {
    async linkAccount({ user }) {
      if (user.id)
        await userService.updateUser(user.id, { emailVerified: new Date() })
    }
  },
  callbacks: {
    async session({ token, session }) {
      console.log({
        sessionToken: token
      })
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await userService.getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})