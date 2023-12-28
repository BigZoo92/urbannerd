"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostLikesCount = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPostLikesCount = async (req, res) => {
    const { postId } = req.params;
    try {
        const likesCount = await prisma.postLike.count({
            where: {
                postId: parseInt(postId),
            },
        });
        res.json({ likesCount });
    }
    catch (error) {
        res.status(500).send("Server Error");
    }
};
exports.getPostLikesCount = getPostLikesCount;
