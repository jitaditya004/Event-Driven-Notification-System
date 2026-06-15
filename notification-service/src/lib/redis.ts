import IORedis from "ioredis"

const REDIS_PORT = Number(process.env.REDIS_PORT)

if (!process.env.REDIS_HOST || Number.isNaN(REDIS_PORT)) {
  throw new Error("Invalid Redis configuration")
}

export const redis = new IORedis({
  host: process.env.REDIS_HOST,
  port: REDIS_PORT,
  maxRetriesPerRequest: null,
  enableReadyCheck: false
})