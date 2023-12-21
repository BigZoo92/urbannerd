import { z } from 'zod';

export const PostSchema = z.object({
  content: z.string().optional(), 
  files: z.array(z.string()).optional(),  
  userId: z.number(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;

export const SubscriptionSchema = z.object({
  followerId: z.number(),
  followingId: z.number(),
});
export type SubscriptionSchemaType = z.TypeOf<typeof SubscriptionSchema>;

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  sizes: z.array(z.string()),
  stock: z.number(),
  model3D: z.string().optional(),
  images: z.array(z.string()),
});
export type ProductSchemaType = z.TypeOf<typeof ProductSchema>;

export const CommentSchema = z.object({
  content: z.string(),
  userId: z.number(),
  postId: z.number().optional(),
  productId: z.number().optional(),
});
export type CommentSchemaType = z.TypeOf<typeof CommentSchema>;
