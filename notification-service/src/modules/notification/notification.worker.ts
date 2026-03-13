import { Worker } from "bullmq"
import { createNotification } from "./notification.service"

new Worker(
  "notifications",
  async job => {

    if (job.name === "user-registered") {

      await createNotification({
        userId: job.data.userId,
        type: "SYSTEM",
        title: "Welcome",
        body: "Welcome to the platform"
      })

    }

  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
)