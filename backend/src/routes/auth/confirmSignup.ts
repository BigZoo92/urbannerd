import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtToken } from "../../constant";
import { prisma } from "../..";

enum StatusUser {
  Unconfirmed = "Unconfirmed",
  Confirmed = "Confirmed",
}

export const confirmSignup = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token de confirmation manquant" });
  }

  try {
    const decodedToken = jwt.verify(token as string, jwtToken) as {
      email: string;
    };

    const email = decodedToken.email;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        status: StatusUser.Confirmed,
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
