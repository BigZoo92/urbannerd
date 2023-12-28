import { Request, Response } from 'express';
import { LoginSchemaType } from '../../types';
export declare const login: (req: Request<{}, {}, LoginSchemaType>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
