"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowersCount = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getFollowersCount = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const followersCount = await prisma.subscription.count({
            where: {
                followingId: userId,
            },
        });
        res.status(200).json({ followersCount });
    }
    catch (error) {
        console.error("Erreur lors de la récupération du nombre de followers :", error);
        res.status(400).json({ message: 'An error occurred', error: error });
    }
};
exports.getFollowersCount = getFollowersCount;
