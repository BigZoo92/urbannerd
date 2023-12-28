"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserFollowing = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const isUserFollowing = async (req, res) => {
    const followerId = req?.session?.user?.id;
    const followingId = parseInt(req.params.followingId);
    if (!followerId) {
        return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
    try {
        const subscription = await prisma.subscription.findFirst({
            where: {
                followerId: followerId,
                followingId: followingId,
            },
        });
        const isFollowing = subscription !== null;
        res.status(200).json({ isFollowing });
    }
    catch (error) {
        console.error("Erreur lors de la vérification de l'abonnement :", error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};
exports.isUserFollowing = isUserFollowing;
