"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfoWithId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserInfoWithId = async (req, res) => {
    //@ts-ignore
    const { userId } = req.params;
    try {
        const user = await prisma.user.findFirst({
            where: { id: { equals: parseInt(userId) } },
        });
        res.status(201).json({ user: user });
    }
    catch (error) {
        console.error(error);
    }
};
exports.getUserInfoWithId = getUserInfoWithId;
