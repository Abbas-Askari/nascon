const { signup, login, editUser } = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/edit", editUser)

module.exports = router;