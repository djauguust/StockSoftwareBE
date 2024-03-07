const express = require("express");
const router = express.Router();

const ventasController = require("../controllers/ventasController");

//POST
router.post("/ventas/", ventasController.createVenta);

//GET
router.get("/ventas/", ventasController.getAllVentas);

//UPDATE
/* router.put("/codigos/:code", codesController.updateCode); */

//DELETE
router.delete("/ventas/:id", ventasController.deleteVenta);

module.exports = router;
