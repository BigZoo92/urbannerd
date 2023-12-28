import { Request, Response } from 'express';
import { SignupSchemaType } from '../../../types';
export declare const signup: (req: Request<{}, {}, SignupSchemaType>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
