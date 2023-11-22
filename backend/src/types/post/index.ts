import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  content: z.string().nullable(),
  videos: z.array(z.string()),
  images: z.array(z.string()),
  model3D: z.string().nullable(),
  tags: z.array(z.string()),
  createdAt: z.string().nullable(),
  userId: z.number().nullable(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
