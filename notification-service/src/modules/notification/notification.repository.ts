import { prisma } from "@/config/prisma"
import { CreateNotificationInput } from "./notification.service"

export const createNotification = async (data: CreateNotificationInput) => {
  return prisma.notification.create({ data })
}

export const getUserNotifications = async (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20
  })
}