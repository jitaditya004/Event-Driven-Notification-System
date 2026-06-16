import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.get("/health", (_, res) => {
  res.json({
    service: "auth-service",
    status: "ok",
  });
});

app.use("/auth", authRoutes);
