import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ProductSchema, ProductSchemaType } from '../../types'; 


const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;
  const newStock = parseInt(stock)
  const newPrice = parseInt(price)
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const sizes = ["S", "M", "L"]
  try {
    const userId = req?.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
    }
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

    res.status(201).json({ product: newProduct });

  } catch (error: any) {
    console.error("Erreur lors de la création du produit :", error);
    res.status(400).json({ message: 'Validation failed', errors: error });
  }
};
