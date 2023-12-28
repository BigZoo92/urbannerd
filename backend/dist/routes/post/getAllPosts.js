"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({});
        res.status(200).json(posts);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des posts :", error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
exports.getAllPosts = getAllPosts;
