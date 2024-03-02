const { signup, login, editUser } = require("../controllers/authController");
const {
  createPost,
  getAllPosts,
  getPost,
} = require("../controllers/postController");
const {
  createThread,
  getAllThreads,
  getThread,
  addMessageToThread,
} = require("../controllers/threadController");
const requireAuth = require("../middleware/requireAuth");

const router = require("express").Router();

router.get("/", getAllThreads);
router.get("/:threadId", getThread);
router.post("/", requireAuth, createThread);
router.post("/:threadId", requireAuth, addMessageToThread);

module.exports = router;
