import { Request, Response } from 'express';

export const getUserInfo = async (req: Request<{}, {}, any>, res: Response) => {
  try {
    if(!req.session.user)return
    res.status(201).json(JSON.parse(req.session.user));
  } catch (error: any) {
    console.error(error);
  }
};
