import { Request, Response } from 'express';
import { prisma } from '../..';

export const getFollowingsCount = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
  
    try {
      const followingsCount = await prisma.subscription.count({
        where: {
          followerId: userId,
        },
      });
      await prisma.$disconnect();
      res.status(200).json({ followingsCount });
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de followings :", error);
      res.status(400).json({ message: 'An error occurred', error: error });
    }
  };
  