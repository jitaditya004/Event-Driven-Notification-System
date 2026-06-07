import { Worker } from "bullmq";

import { redis } from "@/lib/redis";
import { getIO } from "@/socket";
import { createNotification } from "@/modules/notification/notification.service";
import { deadLetterQueue } from "@/queues/dlq.queue";

console.log("Notification worker started");

const worker = new Worker(
  "notifications",
  async job => {
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

      getIO()
        .to(job.data.userId)
        .emit("notification", notification);
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
  if (!job) return;

  console.error("Job failed:", job.id, err.message);

  if (job.attemptsMade >= (job.opts.attempts ?? 1)) {
    await deadLetterQueue.add("failed-notification", {
      originalJobId: job.id,
      data: job.data,
      error: err.message
    });
  }
});