import IORedis from "ioredis"

export const publisher = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
})

export const subscriber = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
})