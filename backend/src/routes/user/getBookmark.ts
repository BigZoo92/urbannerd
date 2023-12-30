import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserJwtPayload } from '../../types';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';

const prisma = new PrismaClient();


export const getBookmark = async (req: Request, res: Response) => {
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
      const bookmarks = await prisma.bookmark.findMany({
        where: {
          userId: userId,
        },
        include: {
          post: true,
        },
      });

      res.status(200).json({ bookmarks });
    } catch (error) {
      console.error("Erreur lors de la récupération des bookmarks :", error);
      res.status(400).json({ message: 'An error occurred', error: error });
    }
};
