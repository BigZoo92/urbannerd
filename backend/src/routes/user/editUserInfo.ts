import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { EditProfil, EditProfilType } from '../../types';


const prisma = new PrismaClient();

export const editUserInfo = async (req: Request, res: Response) => {
  const {bio, website} = req.body
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  try {
    if(!req?.session?.user) return
    const userId = JSON.parse(req?.session?.user).id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
    const pp = files['pp']?.map(file => file.path)[0];
    const postData: EditProfilType = EditProfil.parse({
      bio,
      website,
      pp: pp
    });

   
    const user = await prisma.user.update({
    where:{id: userId},
      data: postData,
    });
    await prisma.user.update({
      where:{id: userId},
        data: postData,
      });

    res.status(201).json({ user: user });

  } catch (error: any) {
    console.error("Erreur lors de la création du post :", error);
    res.status(400).json({ message: 'Validation failed', errors: error });
  }
};
