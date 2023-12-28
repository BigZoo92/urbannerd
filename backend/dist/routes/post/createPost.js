"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const client_1 = require("@prisma/client");
const types_1 = require("../../types");
const prisma = new client_1.PrismaClient();
const createPost = async (req, res) => {
    const { content } = req.body;
    const files = req.files;
    try {
        const userId = req?.session?.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
        }
        const postData = types_1.PostSchema.parse({
            content: req.body.content,
            files: files.files?.map(file => file.path),
            tags: req.body.tags,
            userId: userId
        });
        const filesPath = files['files']?.map(file => file.path);
        const newPost = await prisma.post.create({
            data: {
                content,
                userId,
                files: filesPath,
            },
        });
        res.status(201).json({ post: newPost });
    }
    catch (error) {
        console.error("Erreur lors de la création du post :", error);
        res.status(400).json({ message: 'Validation failed', errors: error });
    }
};
exports.createPost = createPost;
