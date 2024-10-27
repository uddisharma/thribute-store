import "server-only";

import nodemailer from "nodemailer";
import { env } from "@/env.mjs";
import { MAIL } from "@/config/mail";
import { BrandName } from "@/constants";

type EmailPayload = {
  to: string;
  html: string;
  subject: string;
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...MAIL,
  });

  try {
    await transporter.sendMail({
      from: `${BrandName}<${env.SMTP_FROM_EMAIL}>`,
      ...data,
    });
    return true;
  } catch (error: any) {
    throw new Error("Error sending email");
  }
};

type MessageEmailPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
};

export const sendMessageEmail = async (data: MessageEmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...MAIL,
  });
  try {
    transporter.sendMail({
      ...data,
    });
    return true;
  } catch (error: any) {
    throw new Error("Error sending email");
  }
};
