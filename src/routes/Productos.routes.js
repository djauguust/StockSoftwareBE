const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productosController");

//POST
router.post("/codigos/", productsController.createProduct);

//GET
router.get("/codigos/", productsController.getAllProducts);

//UPDATE
/* router.put("/codigos/:code", productsController.updateCode); */

//DELETE
/* router.delete("/codigos/:code", productsController.deleteCode); */

module.exports = router;
