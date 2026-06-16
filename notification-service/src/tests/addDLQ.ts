import "dotenv/config";
import { deadLetterQueue } from "@/queues/dlq.queue";

async function run() {
  await deadLetterQueue.add("failed-notification", {
    originalJobId: "test-job-123",
    data: {
      userId: "test-user-123",
    },
    error: "Simulated notification failure",
  });

  console.log("DLQ test job added");

  process.exit(0);
}

run();
