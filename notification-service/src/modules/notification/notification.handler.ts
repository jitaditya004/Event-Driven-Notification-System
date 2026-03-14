import { eventBus } from "@/events/eventBus"
import { notificationQueue } from "@/queues/notification.queue"

type UserRegisteredEvent = {
  userId: string
}

eventBus.on("USER_REGISTERED", async (event: UserRegisteredEvent) => {

  console.log("Received USER_REGISTERED event", event)

  try {

    await notificationQueue.add(
      "user-registered",
      {
        userId: event.userId
      },
      {
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 3000
        },
        removeOnComplete: true,
        removeOnFail: false
      }
    )

    console.log("Notification job queued")

  } catch (error) {

    console.error("Failed to queue notification", error)

  }

})