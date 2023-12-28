"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const likePost = async (req, res) => {
    const postId = parseInt(req.body.postId);
    const userId = req?.session?.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
    try {
        // Vérifier si le like existe déjà
        const existingLike = await prisma.postLike.findFirst({
            where: {
                postId: postId,
                userId: userId,
            },
        });
        if (existingLike) {
            // Si le like existe déjà, on le supprime
            await prisma.postLike.delete({
                where: { id: existingLike.id },
            });
        }
        else {
            // Sinon, on crée un nouveau like
            await prisma.postLike.create({
                data: {
                    postId: postId,
                    userId: userId,
                },
            });
        }
        res.status(201).json({ message: 'Post liked/unliked successfully.' });
    }
    catch (error) {
        console.error("Erreur lors du like/unlike du post :", error);
        res.status(400).json({ message: 'An error occurred', error: error });
    }
};
exports.likePost = likePost;
