import { Request, Response } from 'express';
import { comparePasswords } from '../../utils/password';
import { searchUserByUsernameOrEmail } from '../../utils/search';
import { AuthSchemaType, LoginSchema, LoginSchemaType } from '../../types';

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
      return res.status(401).json({ user: isPasswordValid, userExist: false });
    }
    
    req.session.user = JSON.stringify(user);
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
      } else {
        console.log("Session saved successfully");
      }
    });
    console.log("USER LOGIN", req.session.user)
    if(!req.session.user)return
    const sendUser: AuthSchemaType = JSON.parse(req.session.user)
    res.status(200).json({ user: req.session.user, userExist: true });
  } catch (error: any) {
    console.error("Erreur lors de l'authentification :", error.errors);
    res
      .status(400)
      .json({ message: 'Validation failed', errors: error.errors });
  }
};
