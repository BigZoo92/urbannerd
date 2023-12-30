import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';

export const isAuth = (req: Request, res: Response) => {
  console.info("REQ", req.headers.authorization)
  const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    console.info("TOKEN", token)
    const decoded = jwt.verify(token, jwtToken);
    console.info("DECODED", decoded)
    res.status(200).json(decoded);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
