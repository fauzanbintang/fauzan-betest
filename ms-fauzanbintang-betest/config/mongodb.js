const mongoose = require("mongoose")
const mongodb_uri =
  process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/db_fauzanbintang_betest`

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb_uri)

    console.log(`mongodb connected: ${conn.connection.host}`)
  } catch (error) {
    console.log("failed to connect to mongodb")
    console.log(error)
  }
}

module.exports = connectDB
