import { Request, Response } from "express";
import { prisma } from "../..";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
      },
    });

    const userIds = users.map((user) => user.id.toString());
    await prisma.$disconnect();
    res.status(200).json(userIds);
  } catch (error) {
    console.error("Erreur lors de la récupération des users :", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
