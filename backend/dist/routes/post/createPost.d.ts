import { Request, Response } from 'express';
export declare const createPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
