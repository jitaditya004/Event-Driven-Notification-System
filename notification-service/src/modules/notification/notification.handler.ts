import { eventBus } from "@/events/eventBus"
import { createNotification } from "@/modules/notification/notification.service"

type UserRegisteredEvent = {
  userId: string
}

eventBus.on("USER_REGISTERED", async (event: UserRegisteredEvent) => {
    console.log("Received USER_REGISTERED event", event)
  try {
    await createNotification({
      userId: event.userId,
      type: "SYSTEM",
      title: "Welcome",
      body: "Welcome to the platform"
    })
  } catch (error) {
    console.error("Failed to create notification", error)
  }
})