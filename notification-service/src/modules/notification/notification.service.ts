import * as repo from "../repositories/notification.repository"

type CreateNotificationInput = {
  userId: string
  type: string
  title: string
  body: string
}

export const createNotification = (data: CreateNotificationInput) => {
  return repo.createNotification(data)
}

export const getNotifications = (userId: string) => {
  return repo.getUserNotifications(userId)
}