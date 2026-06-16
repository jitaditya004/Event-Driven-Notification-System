import { Router } from "express";
import * as controller from "./notification.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", controller.createNotification); //close it
//later consume kafka or rabbitmq ,to /internal/events

router.get("/me", authMiddleware, controller.getMyNotifications);

export default router;
