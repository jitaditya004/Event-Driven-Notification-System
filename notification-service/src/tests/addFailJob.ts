import { notificationQueue } from "../queues/notification.queue"

async function run() {

  await notificationQueue.add(
    "send-email",
    {
      userId: "999",
      email: "fail@test.com"
    },
    {
      attempts: 3
    }
  )

  console.log("Fail job added")

}

run()