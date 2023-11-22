import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PostSchema, PostSchemaType } from '../../types';

const prisma = new PrismaClient({
  log: ['info', 'warn'],
});

export const createPost = async (req: Request, res: Response) => {
  const { content, videos, images, model3D, tags }: PostSchemaType = req.body;

  try {
    PostSchema.parse({
      content,
      videos,
      images,
      model3D,
      tags,
    });

    // Vérifie si l'utilisateur est authentifié
    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.session.user.id;

    // Crée le post sans les tags pour le moment
    const newPost = await prisma.post.create({
      data: {
        content,
        videos,
        images,
        model3D,
        userId,
      },
    });

    // Associe les tags au post
    if (tags && tags.length > 0) {
      const tagObjects = tags.map(tagName => ({ name: tagName }));

      await prisma.post.update({
        where: { id: newPost.id },
        data: {
          tags: {
            connectOrCreate: tagObjects.map(tag => ({
              create: tag,
              where: { name: tag.name },
            })),
          },
        },
      });
    }

    res.status(201).json({ post: newPost });
  } catch (error: any) {
    console.error("Erreur lors de la création du post :", error);
    res.status(400).json({ message: 'Validation failed', errors: error });
  }
};
