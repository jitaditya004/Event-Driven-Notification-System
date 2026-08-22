import "dotenv/config";
import { publisher } from "@/lib/pubsub";
import crypto from "crypto";

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

  console.log("Broadcast event published");

  process.exit(0);
}

testBroadcast();
