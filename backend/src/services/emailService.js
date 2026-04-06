import nodemailer from "nodemailer";
import { env, hasEmailConfig } from "../config/env.js";

const gold = "#cfa355";
const ink = "#050505";
const soft = "rgba(255,255,255,0.72)";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const createTransporter = () =>
  nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });

const buildOwnerNotificationHtml = ({ name, email, subject, message, submittedAt }) => `
  <div style="margin:0;padding:32px;background:${ink};color:#ffffff;font-family:Arial,sans-serif;">
    <div style="max-width:700px;margin:0 auto;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;background:linear-gradient(180deg,#090909 0%,#111111 100%);">
      <div style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.08);background:radial-gradient(circle at top right, rgba(207,163,85,0.18), transparent 45%);">
        <div style="font-size:12px;letter-spacing:4px;text-transform:uppercase;color:${gold};margin-bottom:12px;">Portfolio Contact</div>
        <h1 style="margin:0;font-size:30px;line-height:1.1;">New message from ${escapeHtml(name)}</h1>
      </div>
      <div style="padding:32px;">
        <p style="margin:0 0 18px;color:${soft};font-size:15px;line-height:1.7;">A new inquiry was submitted through your portfolio contact form.</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:12px 0;color:${gold};width:140px;">Name</td><td style="padding:12px 0;color:#ffffff;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:12px 0;color:${gold};">Email</td><td style="padding:12px 0;color:#ffffff;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:12px 0;color:${gold};">Subject</td><td style="padding:12px 0;color:#ffffff;">${escapeHtml(subject)}</td></tr>
          <tr><td style="padding:12px 0;color:${gold};">Received</td><td style="padding:12px 0;color:#ffffff;">${escapeHtml(submittedAt)}</td></tr>
        </table>
        <div style="margin-top:24px;padding:22px;border-radius:20px;background:rgba(255,255,255,0.03);border:1px solid rgba(207,163,85,0.18);">
          <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${gold};margin-bottom:12px;">Message</div>
          <p style="margin:0;white-space:pre-wrap;color:#ffffff;line-height:1.75;">${escapeHtml(message)}</p>
        </div>
      </div>
    </div>
  </div>
`;

const buildAutoReplyHtml = ({ name, subject }) => `
  <div style="margin:0;padding:32px;background:${ink};color:#ffffff;font-family:Arial,sans-serif;">
    <div style="max-width:700px;margin:0 auto;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;background:
      radial-gradient(circle at top right, rgba(207,163,85,0.22), transparent 38%),
      linear-gradient(180deg,#080808 0%,#111111 100%);">
      <div style="padding:34px 32px 28px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <div style="display:inline-block;padding:8px 14px;border:1px solid rgba(207,163,85,0.35);border-radius:999px;color:${gold};font-size:11px;letter-spacing:3px;text-transform:uppercase;">
          Ravi Ranjan Portfolio
        </div>
        <h1 style="margin:22px 0 10px;font-size:34px;line-height:1.05;">Thanks for reaching out, ${escapeHtml(name)}.</h1>
        <p style="margin:0;color:${soft};font-size:16px;line-height:1.7;">Your message about <span style="color:${gold};">${escapeHtml(subject)}</span> is safely in my inbox.</p>
      </div>
      <div style="padding:32px;">
        <p style="margin:0 0 16px;color:#ffffff;font-size:15px;line-height:1.8;">
          I appreciate you taking the time to connect. I usually reply within 24 hours with the next best step, whether that is a project discussion, feedback, or a collaboration plan.
        </p>
        <div style="margin:24px 0;padding:22px;border-radius:20px;background:rgba(255,255,255,0.03);border:1px solid rgba(207,163,85,0.16);">
          <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${gold};margin-bottom:10px;">What happens next</div>
          <p style="margin:0;color:${soft};font-size:14px;line-height:1.8;">I will review your note personally and get back to you with a focused response, availability, and any details needed to move things forward.</p>
        </div>
        <p style="margin:0;color:${soft};font-size:14px;line-height:1.8;">
          Until then, thank you again for visiting the portfolio.
        </p>
        <div style="margin-top:26px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.08);color:${gold};font-size:13px;letter-spacing:2px;text-transform:uppercase;">
          Ravi Ranjan
        </div>
      </div>
    </div>
  </div>
`;

export const sendPortfolioEmails = async (payload) => {
  if (!hasEmailConfig) {
    return {
      delivered: false,
      warning:
        "Message saved, but email delivery is not configured yet. Add your Gmail app password in the backend .env file.",
    };
  }

  const transporter = createTransporter();
  const submittedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  await transporter.sendMail({
    from: env.emailFrom,
    to: env.contactNotificationEmail,
    replyTo: payload.email,
    subject: `Portfolio inquiry: ${payload.subject}`,
    html: buildOwnerNotificationHtml({ ...payload, submittedAt }),
    text: [
      "New portfolio contact submission",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      "",
      payload.message,
    ].join("\n"),
  });

  await transporter.sendMail({
    from: env.emailFrom,
    to: payload.email,
    subject: "Thanks for reaching out to Ravi Ranjan",
    html: buildAutoReplyHtml(payload),
    text: `Hi ${payload.name},\n\nThanks for reaching out through my portfolio. Your message is in my inbox, and I usually reply within 24 hours.\n\nBest,\nRavi Ranjan`,
  });

  return { delivered: true };
};
