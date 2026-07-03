import { prisma } from "@/lib/prisma";
import { publisher } from "@/lib/pubsub";

async function processOutbox() {
  const events = await prisma.outboxEvent.findMany({
    where: {
      status: "PENDING",
    },
    take: 10,
  });

  for (const event of events) {
    await publisher.publish(
      "domain-events",
      JSON.stringify({
        type: event.eventType,
        payload: event.payload,
      }),
    );

    await prisma.outboxEvent.update({
      where: {
        id: event.id,
      },
      data: {
        status: "PROCESSED",
        processedAt: new Date(),
      },
    });
  }
}

setInterval(processOutbox, 5000);

console.log("Auth outbox running");
