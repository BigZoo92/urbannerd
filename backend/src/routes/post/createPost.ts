import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PostSchema, PostSchemaType } from '../../types';


const prisma = new PrismaClient({
  log: ['info', 'warn'],
});

export const createPost = async (req: Request, res: Response) => {
  const {content, tags} = req.body
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log(files)
  try {
    const userId = req?.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
    const postData: PostSchemaType = PostSchema.parse({
      content: req.body.content,
      videos: files.videos?.map(file => file.path),
      images: files.images?.map(file => file.path),
      model3D: files.model3D?.map(file => file.path),
      tags: req.body.tags,
      userId: userId
    });

    const model3DPath = files['model3D']?.map(file => file.path);
    const videoPaths = files['videos']?.map(file => file.path);
    const imagePaths = files['images']?.map(file => file.path);

    const newPost = await prisma.post.create({
      data: {
        content,
        userId,
        model3D: model3DPath,
        videos: videoPaths,
        images: imagePaths,
      },
    });

    for (const tagName of tags) {
      let tag = await prisma.tag.findUnique({
        where: { name: tagName },
      });

      if (!tag) {
        tag = await prisma.tag.create({
          data: { name: tagName },
        });
      }


      await prisma.post.update({
        where: { id: newPost.id },
        data: {
          tags: {
            connect: { id: tag.id },
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
