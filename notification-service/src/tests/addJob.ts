import { notificationQueue } from "../queues/notification.queue";

async function run() {
  await notificationQueue.add("send-email", {
    userId: "123",
  });

  console.log("Job added");
}

run();
