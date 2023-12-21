import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserLikedPosts = async(req: Request, res: Response) => {
    const { userId } = req.params;
  
    try {
      const likedPosts = await prisma.postLike.findMany({
        where: {
          userId: parseInt(userId),
        },
        include: {
          post: true,
        },
      });
      res.json(likedPosts);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
  