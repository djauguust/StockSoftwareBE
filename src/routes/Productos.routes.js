const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productosController");

//POST
router.post("/productos/", productsController.createProduct);

//GET
router.get("/productos/", productsController.getAllProducts);

//UPDATE
router.put("/productos/:codigo", productsController.updateProduct);

//DELETE
router.delete("/productos/:codigo", productsController.deleteProduct);

module.exports = router;
