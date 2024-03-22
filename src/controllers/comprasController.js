const Compras = require("../models/compras.model");
const Usuarios = require("../models/usuarios.model");
const Codigos = require("../models/codigos.model");
const Negocio = require("../models/negocios.model");
const Productos = require("../models/productos.model");

//POST

const createCompra = async (req, res) => {
  console.log("!--Nueva request--!");
  try {
    const { fechaHora, codigo, cantidad, peso, precio, user, isCantidad } =
      req.body;
    if (cantidad < 0 || peso < 0) {
      res.status(400).json({ message: "No enviar cantidad/peso negativos" });
      return;
    }
    const allProducts = await Productos.find();
    const allCodes = await Codigos.find();
    const negocio = await Negocio.find();
    const aumento = negocio[0].aumento;
    let a = 0;
    if (
      cantidad == undefined ||
      peso == undefined ||
      (cantidad == 0 && peso == 0)
    ) {
      res.status(400).json({ message: "Debe enviar cantidad o peso" });
    } else {
      const compra = new Compras({
        fechaHora,
        codigo,
        cantidad,
        peso,
        precio,
        user,
        isCantidad,
      });

      // TO DO PLASMAR COMPRA EN STOCK
      let i = allProducts.find((c) => c.codigo == codigo);
      if (i) {
        // si existe, modifico
        if (i.isCantidad) {
          i.cantidad += cantidad;
        } else {
          i.peso += peso;
        }
        await Productos.findOneAndUpdate(
          { codigo: i.codigo },
          { cantidad: i.cantidad, peso: i.peso }
        );
      } else {
        // si no existe, creo
        let aux = allCodes.find((c) => c.code == codigo);

        if (aux) {
          let p = {
            codigo: codigo,
            precio: precio * (1 + aumento / 100),
            isCantidad: isCantidad,
            cantidad: 0,
            peso: 0,
          };
          console.log(p);
          console.log(aumento);
          if (isCantidad) {
            p.cantidad = cantidad;
            p.peso = 0;
          } else {
            p.cantidad = 0;
            p.peso = peso;
          }

          await Productos.create(p);
        } else {
          a = 1;
        }
      }
      if (a == 0) {
        await compra.save();
        res.status(201).json({ message: "¡Compra Creada!" });
      } else {
        res.status(400).json({ message: "Verificar código de producto" });
      }

      // FIN TO DO PLASMAR COMPRA EN STOCK
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET

const getAllCompras = async (req, res) => {
  try {
    const allCompras = await Compras.find();
    const allUsers = await Usuarios.find();
    const allProducts = await Codigos.find();
    let comprasModificadas = [];
    allCompras.map((c) => {
      let descripAux = allProducts.find((e) => c.codigo == e.code);
      if (descripAux == undefined) {
        descripAux = {
          description: "-",
        };
      }
      let userAux = allUsers.find((e) => c.user == e._id);
      if (userAux == undefined) {
        userAux = {
          apellido: "-",
          nombre: "-",
        };
      }
      let aux = {
        cantidad: c.cantidad,
        codigo: c.codigo,
        producto: descripAux.description,
        fechaHora: c.fechaHora,
        peso: c.peso,
        precio: c.precio,
        user: `${userAux.apellido}, ${userAux.nombre}`,
        id: c._id,
      };
      comprasModificadas.push(aux);
    });
    res.status(200).json(comprasModificadas);
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
    const id = req.params.id;
    const productos = await Compras.find();
    const producto = productos.find((e) => e._id == id);
    if (producto) {
      await Compras.findOneAndDelete({ _id: id });
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
