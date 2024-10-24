const bcrypt = require("bcrypt")

exports.hashPass = (pass) => {
  return bcrypt.hashSync(pass, 10)
}

exports.comparePass = (pass, hash) => {
  return bcrypt.compareSync(pass, hash)
}
