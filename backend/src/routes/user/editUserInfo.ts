import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { EditProfil, EditProfilType, UserJwtPayload } from '../../types';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';


const prisma = new PrismaClient();

export const editUserInfo = async (req: Request, res: Response) => {
  const {bio, website} = req.body
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Token not provided' });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, jwtToken) as UserJwtPayload;
    userId = decoded.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
  } catch (error) {
    return res.status(403).send({ error: 'Invalid token' });
  }
  try {
    
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
