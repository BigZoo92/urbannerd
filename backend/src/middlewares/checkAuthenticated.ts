import { Request, Response } from 'express';

// Middleware pour vérifier si l'utilisateur est connecté
export const checkAuthenticated = (
  req: Request,
  res: Response,
) => {
    if(req.session.user){
      res.status(201).json(true);
    }else{
      res.status(201).json(false);
    }
  
};
