import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserInfoWithId = async (req: Request<{}, {}, any>, res: Response) => {
    const {id} = req.body
  try {
    const user = await prisma.user.findFirst({
        where: { id: { equals: id } },
      });
    res.status(201).json({user: user});
  } catch (error: any) {
    console.error(error);
  }
};
