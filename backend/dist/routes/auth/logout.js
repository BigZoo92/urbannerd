"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = async (req, res) => {
    try {
        req.session.user = null;
        req.session.save();
        res.status(200).json({ message: 'Logout sucessed' });
    }
    catch (error) {
        console.error("Erreur lors de l'authentification :", error.errors);
        res
            .status(400)
            .json({ message: 'Logout failed', errors: error.errors });
    }
};
exports.logout = logout;
