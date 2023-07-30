import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { Role } from "@prisma/client";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's role. */
            role?: Role
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        role?: Role;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        /** The user's role. */
        role?: Role
    }
}