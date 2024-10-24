const userSrv = require("../services/user")

exports.createUser = async (req, res, next) => {
  try {
    const { userName, accountNumber, emailAddress, identityNumber, password } =
      req.body
    const newUser = await userSrv.createUser({
      userName,
      accountNumber,
      emailAddress,
      identityNumber,
      password,
    })

    res.status(201).json({ message: "Successfully create user", data: newUser })
  } catch (error) {
    next(error)
  }
}

exports.findUserById = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await userSrv.findUserById(id)

    res.status(200).json({
      message: "Successfully find user",
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

exports.findUsers = async (req, res, next) => {
  try {
    const query = req.query
    const users = await userSrv.findUsers({
      accountNumber: query?.accountNumber || "",
      identityNumber: query?.identityNumber || "",
    })

    res.status(200).json({
      message: "Successfully find users",
      data: users,
    })
  } catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const { userName, accountNumber, emailAddress, identityNumber } = req.body
    const newUser = await userSrv.updateUser(id, {
      userName,
      accountNumber,
      emailAddress,
      identityNumber,
    })

    res.status(200).json({ message: "Successfully update user", data: newUser })
  } catch (error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id
    await userSrv.deleteUserById(id)

    res.status(200).json({
      message: "Successfully delete user",
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { emailAddress, password } = req.body
    const token = await userSrv.login({
      emailAddress,
      password,
    })

    res
      .status(200)
      .json({ message: "Successfully login", data: { access_token: token } })
  } catch (error) {
    next(error)
  }
}
