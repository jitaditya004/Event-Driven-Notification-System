import "dotenv/config";
import IORedis from "ioredis";

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = Number(process.env.REDIS_PORT);

if (!REDIS_HOST || Number.isNaN(REDIS_PORT)) {
  throw new Error("Invalid Redis configuration");
}

export const publisher = new IORedis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

publisher.on("connect", () => {
  console.log("Redis publisher connected");
});

publisher.on("error", (error) => {
  console.error("Redis publisher error:", error);
});