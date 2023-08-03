import NextAuth, { AuthOptions } from "next-auth";
import Google, { GoogleProfile } from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Role } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/db";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    theme: {
        colorScheme: "light",
    },
    // pages: {
    //     signIn: "/auth/signin",
    // },
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        async session({ session, token }) {
            session.user.role = token.role
            return session
        }
    }
}

export default NextAuth(authOptions);