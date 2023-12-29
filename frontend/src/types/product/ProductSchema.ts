import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  images: z.array(z.string()), 
  model3D: z.string().optional(),
});

export type ProductSchemaType = z.TypeOf<typeof ProductSchema>;
