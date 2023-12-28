import { Request, Response } from 'express';
import { LoginSchemaType } from '../../types';
export declare const logout: (req: Request<{}, {}, LoginSchemaType>, res: Response) => Promise<void>;
