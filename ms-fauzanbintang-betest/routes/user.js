const router = require("express").Router()
const userCtl = require("../controllers/user")
const { authentication, isOwn } = require("../middlewares/auth")

router.post("/login", userCtl.login)
router.get("/", userCtl.findUsers)
router.post("/", userCtl.createUser)
router.get("/:id", userCtl.findUserById)

router.use(authentication)
router.put("/:id", isOwn, userCtl.updateUser)
router.delete("/:id", isOwn, userCtl.deleteUser)

module.exports = router
