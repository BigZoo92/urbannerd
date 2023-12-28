"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserProducts = async (req, res) => {
    const { userId } = req.params;
    try {
        const products = await prisma.product.findMany({
            where: {
                userId: parseInt(userId),
            },
        });
        if (products) {
            res.status(200).json(products);
        }
        else {
            res.status(404).send('Aucun produit trouvé pour cet utilisateur.');
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération des produits de l'utilisateur :", error);
        res.status(500).send('Erreur serveur');
    }
};
exports.getUserProducts = getUserProducts;
