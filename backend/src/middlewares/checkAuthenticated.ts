import { NextFunction, Request, Response } from 'express';

// Middleware pour vérifier si l'utilisateur est connecté
export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if(req.session.user){
      next()
    }else{
      res.status(201).json(false);
    }
  
};