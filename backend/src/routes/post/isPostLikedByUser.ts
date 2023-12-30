import { Request, Response } from 'express';
import { UserJwtPayload } from '../../types';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';
import { prisma } from '../..';

export const isPostLikedByUser = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId as string);
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
    const like = await prisma.postLike.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    await prisma.$disconnect();
    res.status(200).json({ isLiked: !!like });
  } catch (error) {
    console.error("Erreur lors de la vérification du like :", error);
    res.status(400).json({ message: 'An error occurred', error: error });
  }
};
