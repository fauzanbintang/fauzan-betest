const userRepo = require("../repositories/user")
const { hashPass, comparePass } = require("../utils/bcrypt")
const { jwtSign } = require("../utils/jwt")
const { getFromCache, setInCache } = require("../utils/redis")

exports.createUser = async (userData) => {
  try {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const isValidEmailFormat = emailRegex.test(userData.emailAddress)
    if (!isValidEmailFormat) {
      const error = new Error("Invalid email format")
      error.status = 400

      throw error
    }

    userData.password = hashPass(userData.password)

    const newUser = await userRepo.createUser(userData)

    return newUser
  } catch (error) {
    throw error
  }
}

exports.findUserById = async (id) => {
  try {
    // Check cache for user
    const cachedUser = await getFromCache(`user:${id}`)
    if (cachedUser) {
      return cachedUser
    }

    const user = await userRepo.findUserById(id)
    if (!user) {
      const error = new Error("User not found")
      error.status = 404

      throw error
    }

    // Cache user data
    await setInCache(`user:${id}`, user)

    return user
  } catch (error) {
    throw error
  }
}

exports.findUsers = async (query) => {
  try {
    const dbQuery = {}

    if (query.accountNumber) {
      dbQuery.accountNumber = query.accountNumber
    }

    if (query.identityNumber) {
      dbQuery.identityNumber = query.identityNumber
    }

    return await userRepo.findUsers(dbQuery)
  } catch (error) {
    throw error
  }
}

exports.updateUser = async (id, userData) => {
  try {
    return await userRepo.updateUser(id, userData)
  } catch (error) {
    throw error
  }
}

exports.deleteUserById = async (id) => {
  try {
    return await userRepo.deleteUserById(id)
  } catch (error) {
    throw error
  }
}

exports.login = async (userData) => {
  try {
    const user = await userRepo.findUserByEmail(userData.emailAddress)
    if (!user) {
      const error = new Error("Wrong email / password")
      error.status = 400

      throw error
    }

    const validPass = comparePass(userData.password, user.password)
    if (!validPass) {
      const error = new Error("Wrong email / password")
      error.status = 400

      throw error
    }

    return jwtSign({ id: user.id })
  } catch (error) {
    throw error
  }
}
