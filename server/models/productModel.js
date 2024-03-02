const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seller: { type: mongoose.Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  price: { type: Number, required: true},
  imageURL: { type: String }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
