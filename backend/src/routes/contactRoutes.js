import { Router } from "express";
import rateLimit from "express-rate-limit";
import { submitContactForm } from "../controllers/contactController.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages sent from this device. Please try again shortly.",
  },
});

router.post("/", contactLimiter, submitContactForm);

export default router;
