const Product = require("../models/productModel");

async function createProduct(req, res) {
  const { product } = req.body;

  const newProduct = new Product(product);
  await newProduct.save();
  console.log(newProduct);
  return res.json({ product: newProduct });
}

async function getAllProducts(req, res) {
  const products = await Product.find().exec();
  res.json({ products });
}

async function getProduct(req, res) {
  const { productId } = req.params;

  const product = await Product.findById(productId).exec();

  if (!product) {
    return res.json({ error: "No Such product Found" });
  }

  return res.json({ product });
}

module.exports = { getAllProducts, getProduct, createProduct };
