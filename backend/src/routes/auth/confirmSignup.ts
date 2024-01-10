import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtToken } from "../../constant";
import { prisma } from "../..";

export const confirmSignup = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token de confirmation manquant" });
  }

  try {
    const decodedToken = jwt.verify(token as string, jwtToken) as {
      userId: number;
      username: string;
      website: string;
      bio: string;
      pp: string;
      email: string;
    };

    const { email, userId } = decodedToken;

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "Confirmed",
      },
    });

    await prisma.$disconnect();
    res.redirect("https://urbannerd-frontend.vercel.app");
  } catch (error) {
    console.error("Erreur lors de la confirmation d'inscription :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la confirmation d'inscription" });
  }
};
