import { Request, Response } from 'express';
import { UserJwtPayload } from '../../types';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';
import { prisma } from '../..';

export const isUserFollowing = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Token not provided' });
  }

  let followerId;
  try {
    const decoded = jwt.verify(token, jwtToken) as UserJwtPayload;
    followerId = decoded.userId;
    if (!followerId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
  } catch (error) {
    return res.status(403).send({ error: 'Invalid token' });
  }
    const followingId = parseInt(req.body.followingId); 
  
  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });
    await prisma.$disconnect();
    const isFollowing = subscription !== null;
    res.status(200).json({ isFollowing });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'abonnement :", error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};
