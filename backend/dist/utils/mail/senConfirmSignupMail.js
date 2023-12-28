"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPassword = exports.sendConfirmSignupMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../../constant");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: `${process.env.MAIL}`,
        pass: `${process.env.MDP_SECRET}`,
    },
});
const sendConfirmSignupMail = async (email) => {
    const emailToken = jsonwebtoken_1.default.sign({ email }, constant_1.jwtToken, {
        expiresIn: '1d',
    });
    const emailConfirmationLink = `https://1a51-2001-861-5e60-3110-7074-d229-b5bd-e6b.ngrok-free.app/api/auth/confirmSignup?token=${emailToken}`;
    const htmlTemplatePath = path_1.default.resolve(__dirname, '../../templates/mail/confirmSignup.html');
    const htmlTemplate = fs_1.default.readFileSync(htmlTemplatePath, 'utf8');
    const emailHTML = htmlTemplate.replace('{{confirmationLink}}', emailConfirmationLink);
    await transporter.sendMail({
        from: `${process.env.MAIL}`,
        to: email,
        subject: "Confirmation d'inscription",
        html: emailHTML,
    });
};
exports.sendConfirmSignupMail = sendConfirmSignupMail;
const sendResetPassword = async (email) => {
    const emailToken = jsonwebtoken_1.default.sign({ email }, constant_1.jwtToken, {
        expiresIn: '1d',
    });
    const emailResetPasswordLink = `http://localhost:4000/api/auth/resetPassword?token=${emailToken}`;
    const htmlTemplatePath = path_1.default.resolve(__dirname, '../../templates/mail/resetPassword.html');
    const htmlTemplate = fs_1.default.readFileSync(htmlTemplatePath, 'utf8');
    const emailHTML = htmlTemplate.replace('{{ResetPasswordLink}}', emailResetPasswordLink);
    await transporter.sendMail({
        from: `${process.env.MAIL}`,
        to: email,
        subject: "Confirmation d'inscription",
        html: emailHTML,
    });
};
exports.sendResetPassword = sendResetPassword;
