import { Request, Response } from 'express';
import { prisma } from '../..';

export const getProductWithId = async (req: Request<{}, {}, any>, res: Response) => {
  //@ts-ignore
  const {productId} = req.params;
  try {
    const product = await prisma.product.findFirst({
        where: { id: { equals: parseInt(productId) } },
      });
      await prisma.$disconnect();
    res.status(201).json({product: product});
  } catch (error: any) {
    console.error(error);
  }
};