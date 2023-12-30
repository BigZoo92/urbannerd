import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserJwtPayload } from '../../types';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';

const prisma = new PrismaClient();

export const likePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.body.postId);
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
    // Vérifier si le like existe déjà
    const existingLike = await prisma.postLike.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (existingLike) {
      // Si le like existe déjà, on le supprime
      await prisma.postLike.delete({
        where: { id: existingLike.id },
      });
    } else {
      // Sinon, on crée un nouveau like
      await prisma.postLike.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });
    }

    res.status(201).json({ message: 'Post liked/unliked successfully.' });
  } catch (error) {
    console.error("Erreur lors du like/unlike du post :", error);
    res.status(400).json({ message: 'An error occurred', error: error });
  }
};
