import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import contactRoutes from "./routes/contactRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import { notFoundHandler } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.allowedOrigins.length === 0) {
        return callback(null, true);
      }

      if (env.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Portfolio backend is running.",
  });
});

app.use("/api/contact", contactRoutes);
app.use("/api/content", contentRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
