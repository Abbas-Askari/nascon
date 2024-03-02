const {
  getAllProducts,
  createProduct,
  getProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProduct);

module.exports = router;
