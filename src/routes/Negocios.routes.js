const express = require("express");
const router = express.Router();

const negociosController = require("../controllers/negociosController");

//POST
router.post("/negocio/", negociosController.createNegocio);

//GET
router.get("/negocio/", negociosController.getNegocio);

//UPDATE
router.put("/negocio/:code", negociosController.updateNegocio);

//DELETE
router.delete("/negocio/:code", negociosController.deleteNegocio);

module.exports = router;
