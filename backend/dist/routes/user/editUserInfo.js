"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserInfo = void 0;
const client_1 = require("@prisma/client");
const types_1 = require("../../types");
const prisma = new client_1.PrismaClient();
const editUserInfo = async (req, res) => {
    const { bio, website } = req.body;
    const files = req.files;
    try {
        const userId = req?.session?.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
        }
        const pp = files['pp']?.map(file => file.path)[0];
        const postData = types_1.EditProfil.parse({
            bio,
            website,
            pp: pp
        });
        const user = await prisma.user.update({
            where: { id: userId },
            data: postData,
        });
        await prisma.user.update({
            where: { id: userId },
            data: postData,
        });
        res.status(201).json({ user: user });
    }
    catch (error) {
        console.error("Erreur lors de la création du post :", error);
        res.status(400).json({ message: 'Validation failed', errors: error });
    }
};
exports.editUserInfo = editUserInfo;
