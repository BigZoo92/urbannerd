import { Request, Response } from "express";
import { hashPassword } from "../../utils/password";
import { searchUserByUsernameOrEmail } from "../../utils/search";
import { SignupSchema, SignupSchemaType } from "../../types";
import { sendConfirmSignupMail } from "../../utils";
import { prisma } from "../..";

enum StatusUser {
  Unconfirmed = "Unconfirmed",
  Confirmed = "Confirmed",
}

export const signup = async (
  req: Request<{}, {}, SignupSchemaType>,
  res: Response
) => {
  const { username, email, password }: SignupSchemaType = req.body;
  try {
    SignupSchema.parse({
      username,
      email,
      password,
    });

    const existingUser = await searchUserByUsernameOrEmail(email);

    if (existingUser) {
      res.status(409).json({ user: existingUser, userExist: true });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        status: StatusUser.Unconfirmed,
      },
    });

    const user = await searchUserByUsernameOrEmail(email);
    await prisma.$disconnect();
    try {
      if (!user?.id) return;
      await sendConfirmSignupMail({
        id: user?.id,
        username: user?.username || "",
        website: user?.website || "",
        bio: user?.bio || "",
        pp: user?.pp || "",
        email: user?.email || "",
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'e-mail de confirmation :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de l'envoi de l'e-mail de confirmation",
      });
      return;
    }

    res.status(201).json({ user: newUser, userExist: false });
  } catch (error: any) {
    console.error("Erreur lors de l'inscription 3 :", error);
    res.status(400).json({ message: "Validation failed", errors: error });
  }
};
