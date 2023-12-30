import { Request, Response } from 'express';
import { comparePasswords } from '../../utils/password';
import { searchUserByUsernameOrEmail } from '../../utils/search';
import { AuthSchemaType, LoginSchema, LoginSchemaType } from '../../types';
import jwt from 'jsonwebtoken';
import {jwtToken} from '../../constant';


export const login = async (
  req: Request<{}, {}, LoginSchemaType>,
  res: Response,
) => {
  const { usernameOrEmail, password }: LoginSchemaType = req.body;
  console.info("LOGIN jwtToken", jwtToken)
  console.log("LOGIN jwtToken", jwtToken)
  console.error("LOGIN jwtToken", jwtToken)
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
      return res.status(401).json({ user: null, userExist: true });
    }
    
    const token = jwt.sign({ userId: user.id, username: user.username, website: user.bio, bio: user.bio, pp: user.pp, email: user.email }, jwtToken, { expiresIn: '7d' },
    function(err, token) {
        if (err) {
            console.log(err);
        } else {
            console.log(token);
        }
    });

    res.status(200).json({ token, userExist: true });
  } catch (error: any) {
    console.error("Erreur lors de l'authentification :", error.errors);
    res
      .status(400)
      .json({ message: 'Validation failed', errors: error.errors });
  }
};