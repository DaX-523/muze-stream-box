import prisma from "@/app/lib/db";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      if (!params.user.email) return false;

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
});

export { handler as GET, handler as POST };
