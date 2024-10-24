const Redis = require("ioredis")

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASS || null,
})

redisClient.on("connect", () => {
  console.log("redis connected:", process.env.REDIS_HOST || "localhost")
})

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err)
})

module.exports = redisClient
