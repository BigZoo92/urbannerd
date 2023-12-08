import { Request, Response } from 'express';
import { comparePasswords } from '../../utils/password';
import { searchUserByUsernameOrEmail } from '../../utils/search';
import { LoginSchema, LoginSchemaType } from '../../types';

export const login = async (
  req: Request<{}, {}, LoginSchemaType>,
  res: Response,
) => {
  const { usernameOrEmail, password }: LoginSchemaType = req.body;

  try {
    LoginSchema.parse({
      usernameOrEmail,
      password,
    });
    const user = await searchUserByUsernameOrEmail(usernameOrEmail);

    if (!user) {
      return res.status(401).json({ user: null, userExist: false });
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ user: user, userExist: false });
    }

    req.session.user = user;
    req.session.save()
    res.status(200).json({ user: req.session.user, userExist: true });
  } catch (error: any) {
    console.error("Erreur lors de l'authentification :", error.errors);
    res
      .status(400)
      .json({ message: 'Validation failed', errors: error.errors });
  }
};
