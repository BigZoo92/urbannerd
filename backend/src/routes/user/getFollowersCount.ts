import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFollowersCount = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
  
    try {
      const followersCount = await prisma.subscription.count({
        where: {
          followingId: userId,
        },
      });
  
      res.status(200).json({ followersCount });
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de followers :", error);
      res.status(400).json({ message: 'An error occurred', error: error });
    }
  };
  