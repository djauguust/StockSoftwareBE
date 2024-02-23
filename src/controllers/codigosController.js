const Codigos = require("../models/codigos.model");

//POST

const createCode = async (req, res) => {
  try {
    const { code, description } = req.body;
    const allCodes = await Codigos.find();
    let usuarioRepetido = allCodes.find(
      (e) => e.code == code || e.description == description
    );
    if (usuarioRepetido) {
      res.status(400).json({ message: "Código o descripción existente" });
    } else {
      const codigo = new Codigos({
        code,
        description,
      });
      await codigo.save();
      res.status(201).json({ message: "¡Producto Creado!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET

const getAllCodes = async (req, res) => {
  try {
    const allCodes = await Codigos.find();
    console.log(allCodes);
    res.status(200).json(allCodes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//UPDATE
const updateCode = async (req, res) => {
  try {
    const code = req.params.code;
    const productos = await Codigos.find();
    const producto = productos.find((e) => e.code == code);
    if (producto) {
      producto.code = req.body.code || producto.code;
      producto.description = req.body.description || producto.description;
      await producto.save();
      res.status(200).json({ message: "Producto actualizado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

//DELETE
const deleteCode = async (req, res) => {
  try {
    const code = req.params.code;
    const productos = await Codigos.find();
    const producto = productos.find((e) => e.code == code);
    if (producto) {
      await Codigos.findOneAndDelete({ code: code });
      res.status(200).json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

module.exports = {
  createCode,
  getAllCodes,
  updateCode,
  deleteCode,
};
