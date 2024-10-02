import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const password = process.env.EMAIL_PWD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});
