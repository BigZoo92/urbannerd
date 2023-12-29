import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductWithId = async (req: Request<{}, {}, any>, res: Response) => {
  //@ts-ignore
  const {productId} = req.params;
  try {
    const product = await prisma.product.findFirst({
        where: { id: { equals: parseInt(productId) } },
      });
    res.status(201).json({product: product});
  } catch (error: any) {
    console.error(error);
  }
};