import { prisma } from "@/lib/prisma"
import { CreateNotificationInput } from "./notification.service"

export const createNotification = async (
  data: CreateNotificationInput
) => {

  return prisma.notification.upsert({

    where: {
      idempotencyKey:
        data.idempotencyKey
    },
    create: data,
    update: {}

  })

}

export const getUserNotifications = async (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20
  })
}