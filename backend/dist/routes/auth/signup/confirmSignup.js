"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmSignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../../../constant");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const confirmSignup = async (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({ message: 'Token de confirmation manquant' });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, constant_1.jwtToken);
        const email = decodedToken.email;
        // Vérifiez si l'utilisateur avec cet e-mail existe déjà
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!existingUser) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" });
        }
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                status: client_1.StatusUser.Unconfirmed,
            },
        });
        //@ts-ignore
        req.session.user = existingUser;
        res.redirect('http://localhost:3000');
    }
    catch (error) {
        console.error("Erreur lors de la confirmation d'inscription :", error);
        res
            .status(500)
            .json({ message: "Erreur lors de la confirmation d'inscription" });
    }
};
exports.confirmSignup = confirmSignup;
