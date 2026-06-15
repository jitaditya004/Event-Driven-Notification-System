import { subscriber } from "@/lib/pubsub"
import { getIO } from "@/socket"

export const startSocketSubscriber = async () => {
  await subscriber.subscribe("notification-created")

  subscriber.on("message", (_, message) => {
    const data = JSON.parse(message)

    getIO()
      .to(data.userId)
      .emit("notification", data.notification)
  })
}