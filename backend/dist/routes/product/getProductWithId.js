"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductWithId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProductWithId = async (req, res) => {
    //@ts-ignore
    const { productId } = req.params;
    try {
        const product = await prisma.product.findFirst({
            where: { id: { equals: parseInt(productId) } },
        });
        res.status(201).json({ product: product });
    }
    catch (error) {
        console.error(error);
    }
};
exports.getProductWithId = getProductWithId;
