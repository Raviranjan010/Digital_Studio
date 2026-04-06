import dotenv from "dotenv";

dotenv.config();

const toBoolean = (value, fallback) => {
  if (typeof value === "undefined") return fallback;
  return value === "true";
};

const splitList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  contactNotificationEmail:
    process.env.CONTACT_NOTIFICATION_EMAIL || "raviranjan01b@gmail.com",
  emailFrom:
    process.env.EMAIL_FROM ||
    "Ravi Ranjan Portfolio <raviranjan01b@gmail.com>",
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: toBoolean(process.env.SMTP_SECURE, true),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
  allowedOrigins: splitList(process.env.ALLOWED_ORIGINS),
};

export const hasEmailConfig = Boolean(env.smtp.user && env.smtp.pass);
