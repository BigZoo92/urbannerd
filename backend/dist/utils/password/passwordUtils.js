"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    const saltRounds = 10;
    try {
        const hash = await bcrypt_1.default.hash(password, saltRounds);
        return hash;
    }
    catch (error) {
        throw error;
    }
};
exports.hashPassword = hashPassword;
const comparePasswords = async (password, hashedPassword) => {
    try {
        const match = await bcrypt_1.default.compare(password, hashedPassword);
        console.info(match);
        return match;
    }
    catch (error) {
        throw error;
    }
};
exports.comparePasswords = comparePasswords;
