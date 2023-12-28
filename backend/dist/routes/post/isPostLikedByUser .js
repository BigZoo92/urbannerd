"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPostLikedByUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isPostLikedByUser = async (req, res) => {
    const postId = parseInt(req.params.postId);
    const userId = req?.session?.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
    try {
        const like = await prisma.postLike.findFirst({
            where: {
                postId: postId,
                userId: userId,
            },
        });
        res.status(200).json({ isLiked: !!like });
    }
    catch (error) {
        console.error("Erreur lors de la vérification du like :", error);
        res.status(400).json({ message: 'An error occurred', error: error });
    }
};
exports.isPostLikedByUser = isPostLikedByUser;
