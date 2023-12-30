import { Request, Response } from 'express';

export const isAuth = (
  req: Request,
  res: Response,
) => {
  console.info("USER ISAUTH", req.session.user)
    if(req.session.user){
      res.status(201).json(JSON.parse(req.session.user));
    }else{
      res.status(201).json(null);
    }
  
};
