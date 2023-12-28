"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserPosts = async (req, res) => {
    const { userId } = req.params;
    try {
        const userPosts = await prisma.post.findMany({
            where: {
                userId: parseInt(userId),
            },
        });
        res.json(userPosts);
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
};
exports.getUserPosts = getUserPosts;
