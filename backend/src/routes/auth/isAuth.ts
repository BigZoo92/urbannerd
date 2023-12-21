import { Request, Response } from 'express';

// Middleware pour vérifier si l'utilisateur est connecté
export const isAuth = (
  req: Request,
  res: Response,
) => {
    if(req.session.user){
      res.status(201).json(req.session.user);
    }else{
      res.status(201).json(null);
    }
  
};
