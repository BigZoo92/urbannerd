import { Request, Response } from 'express';
import { UserJwtPayload } from '../../types';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';
import { prisma } from '../..';

export const toggleBookmark = async (req: Request, res: Response) => {
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
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id },
      });
    } else {
      await prisma.bookmark.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });
    }
    await prisma.$disconnect();
    res.status(201).json({ message: 'Bookmark toggled successfully.' });
  } catch (error) {
    console.error("Erreur lors du toggle du bookmark :", error);
    res.status(400).json({ message: 'An error occurred', error: error });
  }
};
