require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT || 3000

const connectDB = require("./config/mongodb")
const { errorHandler } = require("./middlewares/errorHandler")
const user = require("./routes/user")

connectDB()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/users", user)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

module.exports = app
