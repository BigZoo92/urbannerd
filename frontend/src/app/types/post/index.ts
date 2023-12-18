import { z } from 'zod';

export const PostSchema = z.object({
  content: z.string().nullable(),
  videos: z.array(z.any()).nullable(),
  images: z.array(z.any()).nullable(),
  model3D: z.array(z.any()).nullable(),
  tags: z.string().nullable(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
