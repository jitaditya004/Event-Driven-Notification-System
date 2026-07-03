import { subscriber } from "@/lib/pubsub";
import { prisma } from "@/lib/prisma";
import { fanoutQueue } from "@/queues/fanout.queue";

type UserCreatedEvent = {
  id: string;
  email: string;
  createdAt: string;
};

type DomainEvent = {
  type: string;
  payload: unknown;
};

export const startEventSubscriber = async () => {
  await subscriber.subscribe("domain-events");

  subscriber.on("message", async (_, message) => {
    try {
      const event = JSON.parse(message) as DomainEvent;

      switch (event.type) {
        case "USER_CREATED": {
          const payload = event.payload as UserCreatedEvent;

          await prisma.userProjection.upsert({
            where: {
              id: payload.id,
            },
            update: {
              email: payload.email,
            },
            create: {
              id: payload.id,
              email: payload.email,
              createdAt: payload.createdAt,
            },
          });

          console.log("User projection saved:", payload.id);
          break;
        }

        case "BROADCAST_NOTIFICATION": {
          await fanoutQueue.add("broadcast", event.payload);

          console.log("Broadcast queued");
          break;
        }

        default:
          console.log("Unknown event:", event.type);
      }
    } catch (error) {
      console.error("Event processing failed:", error);
    }
  });
};
