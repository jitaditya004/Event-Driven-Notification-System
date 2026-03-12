import { Router } from "express"
import * as controller from "../controllers/notification.controller"

const router = Router()

router.post("/", controller.createNotification)
router.get("/:userId", controller.getNotifications)

export default router