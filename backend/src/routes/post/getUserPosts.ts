import { Request, Response } from 'express';
import { prisma } from '../..';

export const getUserPosts = async(req: Request, res: Response) => {
    const { userId } = req.params;
  
    try {
      const userPosts = await prisma.post.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
      await prisma.$disconnect();
      res.json(userPosts);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
  