import { Worker } from "bullmq";

import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { notificationQueue } from "@/queues/notification.queue";

const worker = new Worker(
  "fanout",
  async (job) => {
    console.log("Fanout started");

    let cursor: string | undefined;

    while (true) {
      const users = await prisma.userProjection.findMany({
        take: 1000,
        ...(cursor && {
          cursor: {
            id: cursor,
          },
          skip: 1,
        }),
      });

      if (users.length === 0) {
        break;
      }

      await notificationQueue.addBulk(
        users.map((user) => ({
          name: "broadcast",
          data: {
            userId: user.id,
            title: job.data.title,
            body: job.data.body,
          },
          opts: {
            jobId: `${job.data.broadcastId}-${user.id}`,
          },
        })),
      );

      cursor = users[users.length - 1].id;
    }

    console.log("Fanout finished");
  },
  {
    connection: redis,
  },
);

worker.on("completed", (job) => {
  console.log("Fanout completed:", job.id);
});




/*
like for any broadcast send like this maybe
const broadcastId = crypto.randomUUID();

async function testBroadcast() {
  await publisher.publish(
    "domain-events",
    JSON.stringify({
      type: "BROADCAST_NOTIFICATION",
      payload: {
        broadcastId,
        title: "New Feature Released 🚀",
        body: "We added light mode support! subscribe our youtube!!",
        channel: "IN_APP",
      },
    }),
  );
  
  */