const express = require("express");
const router = express.Router();
const { addNewProduct, deleteProductByID } = require("../controllers/ProductController");

router.post("/AddProduct", addNewProduct);
router.post("/DeleteProduct", deleteProductByID);

module.exports = router;