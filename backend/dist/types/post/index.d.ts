import { z } from 'zod';
export declare const PostSchema: z.ZodObject<{
    content: z.ZodOptional<z.ZodString>;
    files: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    userId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: number;
    content?: string | undefined;
    files?: string[] | undefined;
}, {
    userId: number;
    content?: string | undefined;
    files?: string[] | undefined;
}>;
export type PostSchemaType = z.infer<typeof PostSchema>;
export declare const SubscriptionSchema: z.ZodObject<{
    followerId: z.ZodNumber;
    followingId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    followerId: number;
    followingId: number;
}, {
    followerId: number;
    followingId: number;
}>;
export type SubscriptionSchemaType = z.TypeOf<typeof SubscriptionSchema>;
export declare const ProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    sizes: z.ZodArray<z.ZodString, "many">;
    stock: z.ZodNumber;
    model3D: z.ZodOptional<z.ZodString>;
    images: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    images: string[];
    name: string;
    description: string;
    price: number;
    sizes: string[];
    stock: number;
    model3D?: string | undefined;
}, {
    images: string[];
    name: string;
    description: string;
    price: number;
    sizes: string[];
    stock: number;
    model3D?: string | undefined;
}>;
export type ProductSchemaType = z.TypeOf<typeof ProductSchema>;
export declare const CommentSchema: z.ZodObject<{
    content: z.ZodString;
    userId: z.ZodNumber;
    postId: z.ZodOptional<z.ZodNumber>;
    productId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    content: string;
    userId: number;
    postId?: number | undefined;
    productId?: number | undefined;
}, {
    content: string;
    userId: number;
    postId?: number | undefined;
    productId?: number | undefined;
}>;
export type CommentSchemaType = z.TypeOf<typeof CommentSchema>;
