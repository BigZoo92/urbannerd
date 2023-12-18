import { z } from 'zod';

export const PostSchema = z.object({
  content: z.string().optional(), 
  videos: z.array(z.string()).optional(), 
  images: z.array(z.string()).optional(), 
  model3D: z.array(z.string()).optional(), 
  tags: z.array(z.string()).optional(),
  userId: z.number(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
