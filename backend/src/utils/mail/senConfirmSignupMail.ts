import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { jwtToken } from "../../constant";
import fs from "fs";
import path from "path";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.MAIL}`,
    pass: `${process.env.MDP_SECRET}`,
  },
});

interface SendConfirmSignupMailProps {
  id: number;
  username: string;
  website: string;
  bio: string;
  pp: string;
  email: string;
}

export const sendConfirmSignupMail = async (
  user: SendConfirmSignupMailProps
) => {
  const emailToken = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      website: user.website,
      bio: user.bio,
      pp: user.pp,
      email: user.email,
    },
    jwtToken,
    {
      expiresIn: "1d",
    }
  );

  const emailConfirmationLink = `https://urbannerd-production.up.railway.app/api/auth/confirmSignup?token=${emailToken}`;

  const htmlTemplatePath = path.resolve(
    __dirname,
    "../../templates/mail/confirmSignup.html"
  );

  const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");

  const emailHTML = htmlTemplate.replace(
    "{{confirmationLink}}",
    emailConfirmationLink
  );

  await transporter.sendMail({
    from: `${process.env.MAIL}`,
    to: user.email,
    subject: "Confirmation d'inscription",
    html: emailHTML,
  });
};

export const sendResetPassword = async (email: string) => {
  const emailToken = jwt.sign({ email }, jwtToken, {
    expiresIn: "1d",
  });

  const emailResetPasswordLink = `https://urbannerd-production.up.railway.app//api/auth/resetPassword?token=${emailToken}`;

  const htmlTemplatePath = path.resolve(
    __dirname,
    "../../templates/mail/resetPassword.html"
  );

  const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");

  const emailHTML = htmlTemplate.replace(
    "{{ResetPasswordLink}}",
    emailResetPasswordLink
  );

  await transporter.sendMail({
    from: `${process.env.MAIL}`,
    to: email,
    subject: "Confirmation d'inscription",
    html: emailHTML,
  });
};
