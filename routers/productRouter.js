const express = require("express");
const router = express.Router();
const { addNewProduct, deleteProductByID, editProductRecord } = require("../controllers/ProductController");

router.post("/AddProduct", addNewProduct);
router.post("/DeleteProduct", deleteProductByID);
router.post("/EditProduct", editProductRecord);

module.exports = router;