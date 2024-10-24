const User = require("../models/user")

exports.createUser = async (userData) => {
  const newUser = new User(userData)

  return await newUser.save()
}

exports.findUserById = async (id) => {
  return await User.findById(id).select("-password")
}

exports.findUsers = async (query) => {
  return await User.find(query).select("-password")
}

exports.updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true })
}

exports.deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id)
}

exports.findUserByEmail = async (email) => {
  return await User.findOne({ emailAddress: email })
}
