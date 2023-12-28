"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupSchema = exports.EditProfil = exports.LoginSchema = exports.AuthSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.AuthSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4),
    status: zod_1.z.nativeEnum(client_1.StatusUser),
    bio: zod_1.z.string().optional(),
    website: zod_1.z.string().optional(),
    pp: zod_1.z.string().optional(),
});
exports.LoginSchema = zod_1.z.object({
    usernameOrEmail: zod_1.z.string().min(4),
    password: zod_1.z.string().min(4),
});
exports.EditProfil = zod_1.z.object({
    pp: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    website: zod_1.z.string().optional(),
});
exports.SignupSchema = zod_1.z.object({
    username: zod_1.z.string().min(4),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4),
});
