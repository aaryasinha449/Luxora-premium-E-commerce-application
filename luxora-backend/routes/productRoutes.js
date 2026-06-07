const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductBySlug,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/slug/:slug", getProductBySlug);

module.exports = router;