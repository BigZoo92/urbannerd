"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLikedPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserLikedPosts = async (req, res) => {
    const { userId } = req.params;
    try {
        const likedPosts = await prisma.postLike.findMany({
            where: {
                userId: parseInt(userId),
            },
            include: {
                post: true,
            },
        });
        res.json(likedPosts);
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
};
exports.getUserLikedPosts = getUserLikedPosts;
