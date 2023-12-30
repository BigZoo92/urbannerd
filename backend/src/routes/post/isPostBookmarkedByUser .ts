import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const isPostBookmarkedByUser = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId);
    if(!req?.session?.user) return
    const userId = JSON.parse(req?.session?.user).id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
  
    try {
      const bookmark = await prisma.bookmark.findFirst({
        where: {
          postId: postId,
          userId: userId,
        },
      });
  
      res.status(200).json({ isBookmarked: !!bookmark });
    } catch (error) {
      console.error("Erreur lors de la vérification du bookmark :", error);
      res.status(400).json({ message: 'An error occurred', error: error });
    }
  };
  