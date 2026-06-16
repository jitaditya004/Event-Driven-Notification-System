import { subscriber } from "@/lib/pubsub";
import { notificationQueue } from "@/queues/notification.queue";

export async function startNotificationHandler() {
  await subscriber.subscribe("USER_REGISTERED");

  subscriber.on("message", async (_, message) => {
    const event = JSON.parse(message);

    await notificationQueue.add(
      "user-registered",
      {
        userId: event.userId,
        email: event.email,
      },
      {
        jobId: `welcome-${event.userId}`,

        attempts: 5,

        backoff: {
          type: "exponential",
          delay: 3000,
        },
      },
    );
  });
}
