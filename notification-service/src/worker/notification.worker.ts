import { Worker } from "bullmq"
import { createNotification } from "@/modules/notification/notification.service"
import { deadLetterQueue } from "@/queues/dlq.queue"
import { redis } from "@/lib/redis"

console.log("Notification worker started")

const worker = new Worker(
  "notifications",
  async job => {
    if (job.name === "user-registered") {
      await createNotification({
        userId: job.data.userId,
        type: "SYSTEM",
        channel: "IN_APP",
        status: "SENT",
        title: "Welcome",
        body: "Welcome to the platform",
        idempotencyKey: job.id!
      });
    }
  },
  {
    connection: redis
  }
);
worker.on("completed", job => {
  console.log("Job completed:", job.id,"  ",job?.name)
})

worker.on("failed", async (job, err) => {
  if (!job) return

  console.error("Job failed:", job.id, err.message)

  if (job.attemptsMade >= (job.opts.attempts??1)) {

    console.log("Moving job to DLQ")

    await deadLetterQueue.add("failed-notification", {
      originalJobId: job.id,
      data: job.data,
      error: err.message
    })

  }
})


