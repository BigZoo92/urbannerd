import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const isPostLikedByUser = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId as string);
  if(!req?.session?.user) return
  const userId = JSON.parse(req?.session?.user).id;
  try {
    const like = await prisma.postLike.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    res.status(200).json({ isLiked: !!like });
  } catch (error) {
    console.error("Erreur lors de la vérification du like :", error);
    res.status(400).json({ message: 'An error occurred', error: error });
  }
};
