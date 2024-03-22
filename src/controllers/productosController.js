const Codigos = require("../models/codigos.model");
const Productos = require("../models/productos.model");

//POST

const createProduct = async (req, res) => {
  try {
    const { codigo, cantidad, peso, precio, isCantidad } = req.body;
    const allProducts = await Productos.find();
    const allCodes = await Codigos.find();
    let productoRepetido = allProducts.find((e) => e.codigo == codigo);
    let codigoExistente = allCodes.find((e) => e.code == codigo);

    if (productoRepetido) {
      res.status(400).json({ message: "Código existente" });
    } else if (!codigoExistente) {
      res.status(400).json({ message: "No existe código en base de datos" });
    } else if ((isCantidad && peso != 0) || (!isCantidad && cantidad != 0)) {
      res.status(400).json({ message: "Sólo peso o cantidad debe ser 0" });
    } else {
      const codigoStock = new Productos({
        codigo,
        cantidad,
        peso,
        precio,
        isCantidad,
      });
      await codigoStock.save();
      res.status(201).json({ message: "¡Producto Creado!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET

const getAllProducts = async (req, res) => {
  try {
    const allCodes = await Codigos.find();
    const allProducts = await Productos.find();
    let toSend = [];
    allProducts.map((p) => {
      let descripAux = allCodes.find((e) => p.codigo == e.code);
      if (descripAux == undefined) {
        descripAux = {
          description: "-",
        };
      }
      let aux = {
        id: p._id,
        codigo: p.codigo,
        cantidad: p.cantidad,
        peso: p.peso,
        precio: p.precio,
        isCantidad: p.isCantidad,
        descripcion: descripAux.description,
      };
      toSend.push(aux);
    });
    res.status(200).json(toSend);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//UPDATE
const updateProduct = async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const productos = await Productos.find();
    const producto = productos.find((e) => e.codigo == codigo);
    if (req.body.isCantidad == undefined) {
      res.status(404).json({ error: "Qué tipo de producto es?" });
    } else {
      if (producto) {
        producto.isCantidad = req.body.isCantidad;
        producto.precio = req.body.precio || producto.precio;
        if (req.body.isCantidad) {
          producto.cantidad = req.body.cantidad || producto.cantidad;
          producto.peso = 0;
        } else {
          producto.peso = req.body.peso || producto.peso;
          producto.cantidad = 0;
        }
        await producto.save();
        res.status(200).json({ message: "Producto actualizado" });
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

//DELETE
const deleteProduct = async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const productos = await Productos.find();
    const producto = productos.find((e) => e.codigo == codigo);
    if (producto) {
      await Productos.findOneAndDelete({ codigo: codigo });
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
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
