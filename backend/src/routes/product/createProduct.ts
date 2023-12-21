import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ProductSchema, ProductSchemaType } from '../../types'; 


const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, sizes, stock } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  try {
    const userId = req?.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }

    const productData: ProductSchemaType = ProductSchema.parse({
      name,
      description,
      price,
      sizes,
      stock,
      model3D: req.body.model3D,
      images: files.images?.map(file => file.path), 
    });

    const newProduct = await prisma.product.create({
      data: productData,
    });

    res.status(201).json({ product: newProduct });

  } catch (error: any) {
    console.error("Erreur lors de la création du produit :", error);
    res.status(400).json({ message: 'Validation failed', errors: error });
  }
};
