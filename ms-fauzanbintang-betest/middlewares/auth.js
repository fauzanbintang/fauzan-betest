const { jwtVerify } = require("../utils/jwt")
const User = require("../models/user")

exports.authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (!token) {
      const error = new Error("Invalid token")
      error.status = 400

      throw error
    }
    const tokenParts = token.split(" ")
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      const error = new Error("Invalid token")
      error.status = 400

      throw error
    }
    const decoded = jwtVerify(tokenParts[1])

    const user = await User.findById(decoded.id)
    if (!user) {
      const error = new Error("Invalid token")
      error.status = 400

      throw error
    }

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}

exports.isOwn = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: userId } = req.user

    if (userId !== id) {
      const error = new Error("You're unauthorized")
      error.status = 401

      throw error
    }

    next()
  } catch (error) {
    next(error)
  }
}
