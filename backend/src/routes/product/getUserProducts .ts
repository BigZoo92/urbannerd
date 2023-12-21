import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getUserProducts = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const products = await prisma.product.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).send('Aucun produit trouvé pour cet utilisateur.');
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des produits de l'utilisateur :", error);
    res.status(500).send('Erreur serveur');
  }
};
