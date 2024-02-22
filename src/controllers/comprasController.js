const Compras = require("../models/compras.model");

//POST

const createCompra = async (req, res) => {
  try {
    const { fechaHora, codigo, cantidad, peso, precio, user } = req.body;

    const compra = new Compras({
      fechaHora,
      codigo,
      cantidad,
      peso,
      precio,
      user,
    });
    if (cantidad || peso || cantidad == "" || peso == "") {
      res.status(400).json({ message: "Debe enviar cantidad o peso" });
      return;
    } else {
      await compra.save();
      res.status(201).json({ message: "¡Compra Creada!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET

const getAllCompras = async (req, res) => {
  try {
    const allCompras = await Compras.find();
    res.status(200).json(allCompras);
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
const deleteCompra = async (req, res) => {
  try {
    const code = req.params.code;
    const productos = await Compras.find();
    const producto = productos.find((e) => e._id == code);
    if (producto) {
      await Compras.findOneAndDelete({ _id: code });
      res.status(200).json({ message: "Compra eliminada" });
    } else {
      res.status(404).json({ error: "Compra no encontrada" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Compra no encontrada" });
  }
};

module.exports = {
  getAllCompras,
  createCompra,
  deleteCompra,
};
