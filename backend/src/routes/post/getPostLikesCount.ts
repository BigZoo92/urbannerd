import { Request, Response } from 'express';
import { prisma } from '../..';

export const getPostLikesCount = async(req: Request, res: Response) => {
    const { postId } = req.params;
  
    try {
      const likesCount = await prisma.postLike.count({
        where: {
          postId: parseInt(postId),
        },
      });
      await prisma.$disconnect();
      res.json({ likesCount });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
  