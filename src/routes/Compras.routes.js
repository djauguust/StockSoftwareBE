const express = require("express");
const router = express.Router();

const comprasController = require("../controllers/comprasController");

//POST
router.post("/compras/", comprasController.createCompra);

//GET
router.get("/compras/", comprasController.getAllCompras);

//UPDATE
/* router.put("/codigos/:code", codesController.updateCode); */

//DELETE
router.delete("/compras/:id", comprasController.deleteCompra);

module.exports = router;
