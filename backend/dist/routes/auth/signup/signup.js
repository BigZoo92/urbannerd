"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const password_1 = require("../../../utils/password");
const search_1 = require("../../../utils/search");
const client_1 = require("@prisma/client");
const types_1 = require("../../../types");
const utils_1 = require("../../../utils");
const prisma = new client_1.PrismaClient();
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        types_1.SignupSchema.parse({
            username,
            email,
            password,
        });
        const existingUser = await (0, search_1.searchUserByUsernameOrEmail)(email);
        if (existingUser) {
            return res.status(409).json({ user: existingUser, userExist: true });
        }
        const hashedPassword = await (0, password_1.hashPassword)(password);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                status: client_1.StatusUser.Unconfirmed,
            },
        });
        try {
            await (0, utils_1.sendConfirmSignupMail)(email);
        }
        catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail de confirmation :", error);
            res.status(500).json({
                message: "Erreur lors de l'envoi de l'e-mail de confirmation",
            });
            return;
        }
        res.status(201).json({ user: newUser, userExist: false });
    }
    catch (error) {
        console.error("Erreur lors de l'inscription 3 :", error);
        res.status(400).json({ message: 'Validation failed', errors: error });
    }
};
exports.signup = signup;
