"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUserByUsernameOrEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const searchUserByUsernameOrEmail = async (usernameOrEmail) => {
    try {
        if (usernameOrEmail.includes('@')) {
            const user = await prisma.user.findFirst({
                where: { email: { equals: usernameOrEmail } },
            });
            //@ts-ignore
            return user;
        }
        else {
            const user = await prisma.user.findFirst({
                where: { username: { equals: usernameOrEmail } },
            });
            //@ts-ignore
            return user;
        }
    }
    catch (error) {
        console.error("Erreur lors de la recherche d'utilisateur existant :", error);
        throw error;
    }
};
exports.searchUserByUsernameOrEmail = searchUserByUsernameOrEmail;
