import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';

export const isAuth = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
  console.log("TOKEN1", token)
  console.log("TOKEN2", req.headers.authorization)
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    console.info("TOKEN3", token)
    console.info("ISAUTH jwtToken", jwtToken)
    const decoded = jwt.verify(token, jwtToken);
    console.info("DECODED", decoded)
    res.status(200).json(decoded);
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(401).json({ message: "Invalid token", error: err });
  }
};
