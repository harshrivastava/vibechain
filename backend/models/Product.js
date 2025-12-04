const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productIdOnChain: {
    type: String,
    required: true,
  },
  vendorAddress: {
    type: String,
    required: true,
  },
  name: String,
  description: String,
  metadata: Object,
  imageURLs: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
