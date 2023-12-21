import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  images: z.array(z.string()).optional(), 
  model3D: z.string().optional(),
});

export type ProductSchemaType = z.TypeOf<typeof ProductSchema>;
