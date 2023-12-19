import { z } from 'zod';

export const PostSchema = z.object({
  content: z.string().nullable(),
  files: z.array(z.any()).nullable(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
