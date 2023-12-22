import { z } from 'zod';

const StatusUser = z.enum(['unconfirmed', 'confirmed']);

export type StatusUserEnum = z.TypeOf<typeof StatusUser>;

export const AuthSchema = z.object({
  id: z.number(),
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
  status: StatusUser,
  pp: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
});

export type AuthSchemaType = z.TypeOf<typeof AuthSchema>;

export const EditProfil = z.object({
  pp: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
});

export type EditProfilType = z.TypeOf<typeof EditProfil>;

export const LoginSchema = z.object({
  usernameOrEmail: z.string().min(4),
  password: z.string().min(4),
});

export type LoginSchemaType = z.TypeOf<typeof LoginSchema>;

export const SignupSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string(),
});

export type SignupSchemaType = z.TypeOf<typeof SignupSchema>;

export interface AuthSchemaReturnType {
  user: AuthSchemaType;
  userExist: boolean;
}
