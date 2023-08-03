import { prisma } from "@/db";
import { Role } from "@prisma/client";

class User {
    constructor() { }

    isAdmin(role: string) {
        return role === Role.ADMIN;
    }

    // rest
}

export default User;