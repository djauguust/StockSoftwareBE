const express = require("express");
const router = express.Router();

const codesController = require("../controllers/codigosController");

//POST
router.post("/codigos/", codesController.createCode);

//GET
router.get("/codigos/", codesController.getAllCodes);

//UPDATE
router.put("/codigos/:code", codesController.updateCode);



//DELETE

module.exports = router