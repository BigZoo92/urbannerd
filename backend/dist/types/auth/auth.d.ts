import { z } from 'zod';
export declare const AuthSchema: z.ZodObject<{
    id: z.ZodNumber;
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    status: z.ZodNativeEnum<{
        Unconfirmed: "Unconfirmed";
        Confirmed: "Confirmed";
    }>;
    bio: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    pp: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: number;
    username: string;
    email: string;
    password: string;
    status: "Unconfirmed" | "Confirmed";
    bio?: string | undefined;
    website?: string | undefined;
    pp?: string | undefined;
}, {
    id: number;
    username: string;
    email: string;
    password: string;
    status: "Unconfirmed" | "Confirmed";
    bio?: string | undefined;
    website?: string | undefined;
    pp?: string | undefined;
}>;
export type AuthSchemaType = z.TypeOf<typeof AuthSchema>;
export declare const LoginSchema: z.ZodObject<{
    usernameOrEmail: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    usernameOrEmail: string;
}, {
    password: string;
    usernameOrEmail: string;
}>;
export declare const EditProfil: z.ZodObject<{
    pp: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    pp?: string | undefined;
    bio?: string | undefined;
    website?: string | undefined;
}, {
    pp?: string | undefined;
    bio?: string | undefined;
    website?: string | undefined;
}>;
export type EditProfilType = z.TypeOf<typeof EditProfil>;
export type LoginSchemaType = z.TypeOf<typeof LoginSchema>;
export declare const SignupSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export type SignupSchemaType = z.TypeOf<typeof SignupSchema>;
export interface AuthSchemaReturnType {
    user: AuthSchemaType;
    userExist: boolean;
}
