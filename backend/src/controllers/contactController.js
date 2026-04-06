import crypto from "node:crypto";
import { validateContactPayload } from "../utils/contactValidation.js";
import { saveContactMessage } from "../services/contactStorageService.js";
import { sendPortfolioEmails } from "../services/emailService.js";

export const submitContactForm = async (req, res, next) => {
  try {
    const payload = validateContactPayload(req.body);
    const submittedAt = new Date().toISOString();

    await saveContactMessage({
      id: crypto.randomUUID(),
      ...payload,
      submittedAt,
      source: "portfolio-contact-form",
      ipAddress: req.ip,
      userAgent: req.get("user-agent") || "unknown",
    });

    const emailResult = await sendPortfolioEmails(payload);

    if (emailResult.delivered) {
      return res.status(201).json({
        delivered: true,
        saved: true,
        message:
          "Your message was sent successfully. A thank-you email is on its way to your inbox.",
      });
    }

    return res.status(202).json({
      delivered: false,
      saved: true,
      warning: emailResult.warning,
      message:
        "Your message has been saved. Email delivery still needs to be configured on the server.",
    });
  } catch (error) {
    return next(error);
  }
};
