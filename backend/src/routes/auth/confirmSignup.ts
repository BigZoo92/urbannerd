import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtToken } from "../../constant";
import { prisma } from "../..";
import { searchUserByUsernameOrEmail } from "../../utils";

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
    const user = await searchUserByUsernameOrEmail(email);
    await prisma.$disconnect();
    if (!user?.id) return;
    jwt.sign(
      {
        userId: user.id,
        username: user.username,
        website: user.website,
        bio: user.bio,
        pp: user.pp,
        email: user.email,
      },
      jwtToken,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          console.error("Erreur lors de la génération du token :", err);
          return res
            .status(500)
            .json({ message: "Erreur lors de la génération du token" });
        } else {
          console.log(token);
          res.redirect(
            `https://urbannerd-frontend.vercel.app/auth?token=${token}`
          );
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors de la confirmation d'inscription :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la confirmation d'inscription" });
  }
};
