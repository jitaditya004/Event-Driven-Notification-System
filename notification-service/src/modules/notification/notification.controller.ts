import { Request, Response } from "express"
import * as service from "../services/notification.service"

export const createNotification = async (req: Request, res: Response) => {
  const notification = await service.createNotification(req.body)
  res.json(notification)
}

export const getNotifications = async (req: Request, res: Response) => {
  const { userId } = req.params
  const notifications = await service.getNotifications(userId)
  res.json(notifications)
}