"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPostBookmarkedByUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isPostBookmarkedByUser = async (req, res) => {
    const postId = parseInt(req.params.postId);
    const userId = req?.session?.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
    try {
        const bookmark = await prisma.bookmark.findFirst({
            where: {
                postId: postId,
                userId: userId,
            },
        });
        res.status(200).json({ isBookmarked: !!bookmark });
    }
    catch (error) {
        console.error("Erreur lors de la vérification du bookmark :", error);
        res.status(400).json({ message: 'An error occurred', error: error });
    }
};
exports.isPostBookmarkedByUser = isPostBookmarkedByUser;
