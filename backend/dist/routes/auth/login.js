"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const password_1 = require("../../utils/password");
const search_1 = require("../../utils/search");
const types_1 = require("../../types");
const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    console.info(password);
    try {
        types_1.LoginSchema.parse({
            usernameOrEmail,
            password,
        });
        const user = await (0, search_1.searchUserByUsernameOrEmail)(usernameOrEmail);
        if (!user) {
            return res.status(401).json({ user: null, userExist: false });
        }
        const isPasswordValid = await (0, password_1.comparePasswords)(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ user: isPasswordValid, userExist: false });
        }
        req.session.user = user;
        req.session.save();
        console.info(req.session.user);
        res.status(200).json({ user: req.session.user, userExist: true });
    }
    catch (error) {
        console.error("Erreur lors de l'authentification :", error.errors);
        res
            .status(400)
            .json({ message: 'Validation failed', errors: error.errors });
    }
};
exports.login = login;
