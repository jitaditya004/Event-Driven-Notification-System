import express, { Application } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors";

import "@/modules/notification/notification.handler";
import notificationRoutes from "@/modules/notification/notification.routes";
import { bullBoardRouter } from "@/queues/queueDashboard";

export const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(pinoHttp());
app.use(cookieParser());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/notifications", notificationRoutes);
app.use("/admin/queues", bullBoardRouter);
