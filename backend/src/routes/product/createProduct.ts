import { Request, Response } from 'express';
import { UserJwtPayload } from '../../types'; 
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';
import { prisma } from '../..';

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;
  const newStock = parseInt(stock)
  const newPrice = parseInt(price)
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const sizes = ["S", "M", "L"]

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
    const images = files['images']?.map(file => file.path);
    const model3D = files['model3D']?.map(file => file.path)[0];
    // const productData: ProductSchemaType = ProductSchema.parse({
    //   name,
    //     description,
    //     sizes,
    //     price: newPrice,
    //     stock: newStock,
    //     images,
    //     model3D,
    //     userId
    // });
    
    const newProduct = await prisma.product.create({
      //@ts-ignore
      data: {
        name,
        description,
        sizes,
        price: newPrice,
        stock: newStock,
        images,
        model3D,
        userId
      },
    });
    await prisma.$disconnect();
    res.status(201).json({ product: newProduct });

  } catch (error: any) {
    console.error("Erreur lors de la création du produit :", error);
    res.status(400).json({ message: 'Validation failed', errors: error });
  }
};
