import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserPosts = async(req: Request, res: Response) => {
    const { userId } = req.params;
  
    try {
      const userPosts = await prisma.post.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
      res.json(userPosts);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
  