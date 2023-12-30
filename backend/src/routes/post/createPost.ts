import { Request, Response } from 'express';
import { PostSchema, PostSchemaType } from '../../types';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';
import { UserJwtPayload } from '../../types';
import { prisma } from '../..';

export const createPost = async (req: Request, res: Response) => {
  const { content } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Token not provided' });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, jwtToken) as UserJwtPayload;
    userId = decoded.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
  } catch (error) {
    return res.status(403).send({ error: 'Invalid token' });
  }

  try {
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
    await prisma.$disconnect();
    res.status(201).json({ post: newPost });

  } catch (error: any) {
    console.error("Erreur lors de la création du post :", error);
    res.status(400).json({ message: 'Validation failed', errors: error });
  }
};
