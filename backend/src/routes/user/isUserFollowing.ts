import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const isUserFollowing = async (req: Request, res: Response) => {
  const followerId = req?.session?.user?.id;
  const followingId = parseInt(req.params.followingId);

  if (!followerId) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    const isFollowing = subscription !== null;
    res.status(200).json({ isFollowing });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'abonnement :", error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};
