const { getAllUsers, getUser } = require("../controllers/userController")

const router = require("express").Router()

router.get("/", getAllUsers)
router.get("/:userID", getUser)

module.exports = router