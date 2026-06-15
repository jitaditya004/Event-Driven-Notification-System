import { Worker } from "bullmq";

import { redis } from "@/lib/redis";
import { createNotification } from "@/modules/notification/notification.service";
import { deadLetterQueue } from "@/queues/dlq.queue";
import { publisher } from "@/lib/pubsub"

const TEST_FAILURE = process.env.TEST_FAILURE === "true"

console.log("Notification worker started");

const worker = new Worker(
  "notifications",
  async job => {
    console.log("Processing job:", job.name, job.data)

    if (
      TEST_FAILURE &&
      job.attemptsMade < 2
    ) {
      throw new Error("Simulated worker failure")
    }
    
    if (job.name === "user-registered") {
      const notification = await createNotification({
        userId: job.data.userId,
        type: "SYSTEM",
        channel: "IN_APP",
        status: "SENT",
        title: "Welcome",
        body: "Welcome to the platform",
        idempotencyKey: job.id!
      });

      await publisher.publish(
        "notification-created",
        JSON.stringify({
          userId: job.data.userId,
          notification
        })
      )
    }
  },
  {
    connection: redis
  }
);

worker.on("completed", job => {
  console.log("Job completed:", job.id, job.name);
});

worker.on("failed", async (job, err) => {
  if (!job) return

  console.error("Job failed:", job.id, err.message)

  if (job.attemptsMade >= (job.opts.attempts ?? 1)) {
    console.log("Moving job to DLQ")

    await deadLetterQueue.add("failed-notification", {
      originalJobId: job.id,
      name: job.name,
      data: job.data,
      error: err.message,
      failedAt: new Date()
    })
  }
})