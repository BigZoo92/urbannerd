import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getBookmark = async (req: Request, res: Response) => {
  if(!req?.session?.user) return
  const userId = JSON.parse(req?.session?.user).id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
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
