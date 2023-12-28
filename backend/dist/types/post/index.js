"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = exports.ProductSchema = exports.SubscriptionSchema = exports.PostSchema = void 0;
const zod_1 = require("zod");
exports.PostSchema = zod_1.z.object({
    content: zod_1.z.string().optional(),
    files: zod_1.z.array(zod_1.z.string()).optional(),
    userId: zod_1.z.number(),
});
exports.SubscriptionSchema = zod_1.z.object({
    followerId: zod_1.z.number(),
    followingId: zod_1.z.number(),
});
exports.ProductSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    sizes: zod_1.z.array(zod_1.z.string()),
    stock: zod_1.z.number(),
    model3D: zod_1.z.string().optional(),
    images: zod_1.z.array(zod_1.z.string()),
});
exports.CommentSchema = zod_1.z.object({
    content: zod_1.z.string(),
    userId: zod_1.z.number(),
    postId: zod_1.z.number().optional(),
    productId: zod_1.z.number().optional(),
});
