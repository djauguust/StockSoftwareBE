const express = require("express");
const router = express.Router();

router.get("/test", (request, res) => {res.json("hola")});

module.exports = router;
