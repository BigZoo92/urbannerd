import { Request, Response } from 'express';
import { prisma } from '../..';

export const getUserInfoWithId = async (req: Request<{}, {}, any>, res: Response) => {
  //@ts-ignore
  const {userId} = req.params;
  try {
    const user = await prisma.user.findFirst({
        where: { id: { equals: parseInt(userId) } },
      });
      await prisma.$disconnect();
    res.status(201).json({user: user});
  } catch (error: any) {
    console.error(error);
  }
};
