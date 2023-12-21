import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPostLikesCount = async(req: Request, res: Response) => {
    const { postId } = req.params;
  
    try {
      const likesCount = await prisma.postLike.count({
        where: {
          postId: parseInt(postId),
        },
      });
      res.json({ likesCount });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
  