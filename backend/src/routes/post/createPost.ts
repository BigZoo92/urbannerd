import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PostSchema, PostSchemaType } from '../../types';


const prisma = new PrismaClient({
  log: ['info', 'warn'],
});

export const createPost = async (req: Request, res: Response) => {
  const {content} = req.body
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log(files)
  try {
    const userId = req?.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
    const postData: PostSchemaType = PostSchema.parse({
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

  } catch (error: any) {
    console.error("Erreur lors de la création du post :", error);
    res.status(400).json({ message: 'Validation failed', errors: error });
  }
};
