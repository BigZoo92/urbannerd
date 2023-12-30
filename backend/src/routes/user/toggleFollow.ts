import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const toggleFollow = async (req: Request, res: Response) => {
  if(!req?.session?.user) return
  const followerId = JSON.parse(req?.session?.user).id;
  if (!followerId) {
    return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
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
  