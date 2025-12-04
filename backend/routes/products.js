const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  getProductByHash,
} = require("../controllers/productController");

// POST /api/products
router.post("/", createProduct);

// GET /api/products
router.get("/", getProducts);

// GET /api/products/hash/:hash
router.get("/hash/:hash", getProductByHash);

// GET /api/products/:id
router.get("/:id", getProductById);

module.exports = router;
