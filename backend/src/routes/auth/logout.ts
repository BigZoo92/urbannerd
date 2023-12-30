import { Request, Response } from 'express';
import { LoginSchemaType } from '../../types';

export const logout = async (
  req: Request<{}, {}, LoginSchemaType>,
  res: Response,
) => {

  try {
    req.session.user = null
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
      } else {
        console.log("Session saved successfully");
      }
    });
    res.status(200).json({ message: 'Logout sucessed' });
  } catch (error: any) {
    console.error("Erreur lors de l'authentification :", error.errors);
    res
      .status(400)
      .json({ message: 'Logout failed', errors: error.errors });
  }
};
