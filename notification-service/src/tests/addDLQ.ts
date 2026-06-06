import { deadLetterQueue } from "../queues/dlq.queue"

async function run() {

  await deadLetterQueue.add(
    "failed-notification",
    {
      email: "dead@test.com",
      reason: "email provider failure"
    }
  )

  console.log("DLQ test job added")

}

run()