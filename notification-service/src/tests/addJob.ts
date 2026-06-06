import { notificationQueue } from "../queues/notification.queue"

async function run() {

  await notificationQueue.add(
    "send-email",
    {
      userId: "123",
      email: "test@test.com"
    }
  )

  console.log("Job added")

}

run()