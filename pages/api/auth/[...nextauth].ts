import NextAuth, { AuthOptions } from "next-auth";
import Google, { GoogleProfile } from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Role } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

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
            console.log("jwt", user)
            console.log("token", token)
            return token
        },
        async session({ session, token, user }) {
            session.user.role = token.role
            console.log("session", session)
            console.log("user", user)
            console.log("token", token)
            return session
        }
    }
}

export default NextAuth(authOptions);