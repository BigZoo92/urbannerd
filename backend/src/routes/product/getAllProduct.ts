import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.product.findMany({});
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erreur lors de la récupération des posts :", error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
