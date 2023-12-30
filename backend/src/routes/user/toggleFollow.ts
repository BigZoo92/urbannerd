import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserJwtPayload } from '../../types';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';

const prisma = new PrismaClient();

export const toggleFollow = async (req: Request, res: Response) => {
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
      const existingSubscription = await prisma.subscription.findFirst({
        where: {
          followerId: followerId,
          followingId: followingId,
        },
      });
  
      if (existingSubscription) {
        await prisma.subscription.delete({
          where: { id: existingSubscription.id },
        });
      } else {
        await prisma.subscription.create({
          data: {
            followerId: followerId,
            followingId: followingId,
          },
        });
      }
  
      res.status(201).json({ message: 'Subscription updated successfully.' });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'abonnement :", error);
      res.status(400).json({ message: 'An error occurred', error: error });
    }
  };
  