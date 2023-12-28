"use strict";
// Dans votre fichier de routes (par exemple, bookmark.js)
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleBookmark = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const toggleBookmark = async (req, res) => {
    const postId = parseInt(req.body.postId);
    const userId = req?.session?.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
    try {
        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                postId: postId,
                userId: userId,
            },
        });
        if (existingBookmark) {
            await prisma.bookmark.delete({
                where: { id: existingBookmark.id },
            });
        }
        else {
            await prisma.bookmark.create({
                data: {
                    postId: postId,
                    userId: userId,
                },
            });
        }
        res.status(201).json({ message: 'Bookmark toggled successfully.' });
    }
    catch (error) {
        console.error("Erreur lors du toggle du bookmark :", error);
        res.status(400).json({ message: 'An error occurred', error: error });
    }
};
exports.toggleBookmark = toggleBookmark;
