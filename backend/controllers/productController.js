const Product = require("../models/Product");

// Create a product (after blockchain tx)
exports.createProduct = async (req, res) => {
  try {
    console.log("Received Product Data:", req.body); // DEBUG LOG

    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product stored successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err); // DEBUG LOG
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID (Mongo ID)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by Hash
exports.getProductByHash = async (req, res) => {
  try {
    const product = await Product.findOne({ productIdOnChain: req.params.hash });
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
