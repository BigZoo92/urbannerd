import { AuthSchemaType } from '../types';
declare global {
    namespace Express {
        interface Session {
            _user?: AuthSchemaType | null;
        }
    }
}
declare const router: import("express-serve-static-core").Router;
export default router;
