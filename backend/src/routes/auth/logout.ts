import { Request, Response } from 'express';
import { LoginSchemaType } from '../../types';

export const logout = async (
  req: Request<{}, {}, LoginSchemaType>,
  res: Response,
) => {

  try {
    req.session.user = null
    req.session.save()
    res.status(200).json({ user: req.session.user, userExist: true });
  } catch (error: any) {
    console.error("Erreur lors de l'authentification :", error.errors);
    res
      .status(400)
      .json({ message: 'Logout failed', errors: error.errors });
  }
};
