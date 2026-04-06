import { HttpError } from "./httpError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitize = (value, maxLength) =>
  String(value || "")
    .trim()
    .slice(0, maxLength);

export const validateContactPayload = (payload) => {
  const name = sanitize(payload.name, 100);
  const email = sanitize(payload.email, 160).toLowerCase();
  const subject = sanitize(payload.subject, 160);
  const message = sanitize(payload.message, 5000);
  const website = sanitize(payload.website, 120);

  if (website) {
    throw new HttpError(400, "Spam submission rejected.");
  }

  if (!name) throw new HttpError(400, "Name is required.");
  if (!email) throw new HttpError(400, "Email is required.");
  if (!EMAIL_REGEX.test(email)) {
    throw new HttpError(400, "Please provide a valid email address.");
  }
  if (!subject) throw new HttpError(400, "Subject is required.");
  if (!message) throw new HttpError(400, "Message is required.");
  if (message.length < 20) {
    throw new HttpError(400, "Message should be at least 20 characters.");
  }

  return { name, email, subject, message };
};
