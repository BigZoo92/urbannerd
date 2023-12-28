import { Request, Response } from 'express';
export declare const isUserFollowing: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
