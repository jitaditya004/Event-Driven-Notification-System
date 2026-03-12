import { prisma } from "../config/prisma"

type CreateNotificationInput = {
  userId: string
  type: string
  title: string
  body: string
}

export const createNotification = (data: CreateNotificationInput) => {
  return prisma.notification.create({ data })
}

export const getUserNotifications = (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20
  })
}