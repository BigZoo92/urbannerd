"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthenticated = void 0;
// Middleware pour vérifier si l'utilisateur est connecté
const checkAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.status(201).json(false);
    }
};
exports.checkAuthenticated = checkAuthenticated;
