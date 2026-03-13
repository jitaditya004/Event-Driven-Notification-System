import { notificationQueue } from "@/modules/notification/notification.queue"

export async function handleUserRegistered(userId: string, email: string) {

  await notificationQueue.add(
    "user-registered",
    {
      userId,
      email
    }
  )

}