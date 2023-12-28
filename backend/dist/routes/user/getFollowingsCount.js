"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowingsCount = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getFollowingsCount = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const followingsCount = await prisma.subscription.count({
            where: {
                followerId: userId,
            },
        });
        res.status(200).json({ followingsCount });
    }
    catch (error) {
        console.error("Erreur lors de la récupération du nombre de followings :", error);
        res.status(400).json({ message: 'An error occurred', error: error });
    }
};
exports.getFollowingsCount = getFollowingsCount;
