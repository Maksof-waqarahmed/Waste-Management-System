import nodemailer from "nodemailer";
import { UserSchema } from "./user";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendVerificationEmail(token: string, user: any) {
  const verificationUrl = `http://localhost:3000/auth/email-verification?token=${token}`;

  const mailOption = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Email Verification",
    text: `Please verify your email by clicking on the link: ${verificationUrl}`,
    html: `<p>Please verify your email by clicking on the link below:</p><a href="${verificationUrl}">${verificationUrl}</a>`,
  };

  await transporter.sendMail(mailOption);
}
