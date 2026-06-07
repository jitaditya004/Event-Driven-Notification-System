import { eventBus } from "@/events/eventBus"
import { notificationQueue } from "@/queues/notification.queue"

type UserRegisteredEvent = {
  userId: string
}

eventBus.on("USER_REGISTERED", async event => {
  console.log("USER_REGISTERED", event);

  await notificationQueue.add(
    "user-registered",
    {
      userId: event.userId,
      email: event.email
    },
    {
      jobId: `welcome-${event.userId}`,
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 3000
      },
      removeOnComplete: {
        age: 3600,
        count: 1000
      },
      removeOnFail: false
    }
  );
});