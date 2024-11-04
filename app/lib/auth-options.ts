import prisma from "@/app/lib/db";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async jwt({ account, token, profile }) {
      // console.log("jwt", account, token, user, profile);
      try {
        if (account && profile) {
          const user = await prisma.user.findUnique({
            where: { email: token?.email ?? "" },
          });

          if (user) {
            token.userId = user?.id;
          }
          token.id = account?.access_token;
          token.email = profile?.email as string;
        }
      } catch (error) {
        if (error instanceof PrismaClientInitializationError) {
          throw new Error("Internal server error");
        }
        console.log(error);
        throw error;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // console.log("session", session, token);

      try {
        const user = await prisma.user.findUnique({
          where: { email: token?.email ?? "" },
        });
        if (user && session) {
          (session.user as { id: string }).id = user?.id as string;
          // console.log("in", session, user);
        }
      } catch (error) {
        if (error instanceof PrismaClientInitializationError) {
          throw new Error("Internal server error");
        }
        console.log(error);
        throw error;
      }
      return session;
    },
    async signIn(params) {
      if (!params.user.email) return false;
      console.log(params);
      const existingUser = await prisma.user.findFirst({
        where: {
          email: params?.user?.email,
        },
      });
      if (existingUser) return true;
      await prisma.user.create({
        data: {
          email: params?.user?.email,
          password: "",
          provider: "Google",
        },
      });
      return true;
    },
  },
} satisfies NextAuthOptions;
