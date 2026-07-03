import { Queue } from "bullmq";
import { redis } from "@/lib/redis";

export const fanoutQueue = new Queue("fanout", {
  connection: redis,
});
