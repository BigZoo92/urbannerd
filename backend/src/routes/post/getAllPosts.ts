import { Request, Response } from 'express';
import { prisma } from '../..';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({});
    await prisma.$disconnect();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erreur lors de la récupération des posts :", error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
