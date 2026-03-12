import { Request, Response } from "express"
import * as service from "./notification.service"

export const createNotification = async (req: Request, res: Response) => {
  try {
    const notification = await service.createNotification(req.body)
    res.status(201).json(notification)
  } catch (error) {
    res.status(500).json({ message: "Failed to create notification" })
  }
}

export const getNotifications = async (req: Request<{ userId: string }>, res: Response) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({ message: "userId required" })
    }

    const notifications = await service.getNotifications(userId)

    res.json(notifications)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" })
  }
}