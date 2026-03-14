import { Worker } from "bullmq"
import { createNotification } from "./notification.service"

console.log("Notification worker started")

const worker = new Worker(
  "notifications",
  async job => {
    console.log("Processing job:", job.name, job.data)

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
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    }
  }
)


worker.on("failed", (job, err) => {
  console.error("Job failed:", job?.name, err)
})


