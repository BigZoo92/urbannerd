import { StatusUser } from '@prisma/client';
import { z } from 'zod';

export const AuthSchema = z.object({
  id: z.number(),
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
  status: z.nativeEnum(StatusUser),
});

export type AuthSchemaType = z.TypeOf<typeof AuthSchema>;

export const LoginSchema = z.object({
  usernameOrEmail: z.string().min(4),
  password: z.string().min(4),
});

export type LoginSchemaType = z.TypeOf<typeof LoginSchema>;

export const SignupSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
});

export type SignupSchemaType = z.TypeOf<typeof SignupSchema>;

export interface AuthSchemaReturnType {
  user: AuthSchemaType;
  userExist: boolean;
}
