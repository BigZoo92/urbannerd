import { AuthSchemaType } from './types';
declare module 'express-session' {
    interface Session {
        user: AuthSchemaType | null;
    }
}
