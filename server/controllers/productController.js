const Product = require("../models/productModel");

async function postProduct(req, res) {
  const { product } = req.body

  const newProduct = new Product(product)
  await newProduct.save()

  return res.json({product: newProduct})
}

async function getAllProducts(req, res) {
  const products = await Product.find().exec();
  res.json({ products });
}

async function getProduct(req, res) {
  const { productID } = req.params

  const product = await Product.findById(productID).exec()

  if (!product) {
    return res.json({error: "No Such product Found"})
  }

  return res.json({product})
}

module.exports = { getAllProducts, getProduct };
