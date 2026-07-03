import "dotenv/config";
import { publisher } from "@/lib/pubsub";

async function testBroadcast() {
  await publisher.publish(
    "domain-events",
    JSON.stringify({
      type: "BROADCAST_NOTIFICATION",
      payload: {
        title: "New Feature Released 🚀",
        body: "We added dark mode support!",
        channel: "IN_APP",
      },
    }),
  );

  console.log("Broadcast event published");

  process.exit(0);
}

testBroadcast();
