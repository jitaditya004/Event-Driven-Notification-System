import * as repo from "./notification.repository"

export type CreateNotificationInput = {
  userId: string
  type: string
  title: string
  body: string
}

export const createNotification = async (data: CreateNotificationInput) => {
  return repo.createNotification(data)
}

export const getNotifications = async (userId: string) => {
  return repo.getUserNotifications(userId)
}