const { signup, login, editUser } = require("../controllers/authController");
const {
  createPost,
  getAllPosts,
  getPost,
} = require("../controllers/postController");

const router = require("express").Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:postId", getPost);

module.exports = router;
