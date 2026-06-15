import { notificationQueue } from "../queues/notification.queue"

const run = async () => {
  await notificationQueue.add(
    "send-email",
    {
      userId: "999",
      email: "fail@test.com"
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000
      }
    }
  )

  console.log("Fail job added")

  await notificationQueue.close()
}

run()