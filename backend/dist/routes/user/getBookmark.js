"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookmark = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getBookmark = async (req, res) => {
    const userId = req?.session?.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId: userId,
            },
            include: {
                post: true,
            },
        });
        res.status(200).json({ bookmarks });
    }
    catch (error) {
        console.error("Erreur lors de la récupération des bookmarks :", error);
        res.status(400).json({ message: 'An error occurred', error: error });
    }
};
exports.getBookmark = getBookmark;
