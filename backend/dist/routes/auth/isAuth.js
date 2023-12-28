"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = (req, res) => {
    console.info(req.session.user);
    if (req.session.user) {
        res.status(201).json(req.session.user);
    }
    else {
        res.status(201).json(null);
    }
};
exports.isAuth = isAuth;
