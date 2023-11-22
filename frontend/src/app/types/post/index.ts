import { z } from 'zod';

export const PostSchema = z.object({
  content: z.string().nullable(),
  videos: z.array(z.string()),
  images: z.array(z.string()),
  model3D: z.string().nullable(),
  tags: z.array(z.string()),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
