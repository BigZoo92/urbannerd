import { Request, Response } from 'express';

export const getUserInfo = async (req: Request<{}, {}, any>, res: Response) => {
  try {
    res.status(201).json(req.session.user);
  } catch (error: any) {
    console.error(error);
  }
};
