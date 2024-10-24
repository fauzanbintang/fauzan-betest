const redisClient = require("../config/redis")

exports.getFromCache = async (key) => {
  try {
    const data = await redisClient.get(key)

    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error getting from Redis:", error)
    return null
  }
}

exports.setInCache = async (key, value, ttl = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(value), "EX", ttl)
  } catch (error) {
    console.error("Error setting in Redis:", error)
  }
}

exports.deleteFromCache = async (key) => {
  try {
    await redisClient.del(key)
  } catch (error) {
    console.error("Error deleting from Redis:", error)
  }
}
