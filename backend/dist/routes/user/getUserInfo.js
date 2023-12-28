"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const getUserInfo = async (req, res) => {
    try {
        res.status(201).json(req.session.user);
    }
    catch (error) {
        console.error(error);
    }
};
exports.getUserInfo = getUserInfo;
