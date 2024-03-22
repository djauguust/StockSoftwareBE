const Ventas = require("../models/ventas.model");
const Usuarios = require("../models/usuarios.model");
const Codigos = require("../models/codigos.model");
const Productos = require("../models/productos.model");

//POST

const createVenta = async (req, res) => {
  try {
    const { fechaHora, productos, user } = req.body;
    let b = 0;
    const allProducts = await Productos.find();
    if (!(productos == undefined)) {
      productos.map((p) => {
        if (
          p.cantidad == undefined ||
          p.peso == undefined ||
          (p.cantidad == 0 && p.peso == 0)
        ) {
          b = 1;
        }
      });
      if (b == 1) {
        res.status(400).json({ message: "Debe enviar cantidad o peso" });
      } else {
        const venta = new Ventas({
          fechaHora,
          productos,
          userId: user,
        });
        await venta.save();
        // TO DO PLASMAR VENTA EN STOCK
        productos.map(async (p) => {
          let i = allProducts.find((c) => c.codigo == p.codigo);
          if (i) {
            // si existe, modifico
            if (i.isCantidad) {
              i.cantidad -= p.cantidad;
            } else {
              i.peso -= p.peso;
            }
            await Productos.findOneAndUpdate(
              { _id: i._id },
              { cantidad: i.cantidad, peso: i.peso },
              { new: true }
            );
          } else {
            // si no existe, creo
            if (p.isCantidad) {
              p.cantidad = 0;
            } else {
              p.peso = 0;
            }
            await Productos.create(p);
          }
        });
        /* FIN TODO */
        res.status(201).json({ message: "¡Venta Creada!" });
      }
    } else {
      res.status(400).json({ message: "Debe enviar los productos vendidos" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET

const getAllVentas = async (req, res) => {
  try {
    const allVentas = await Ventas.find();
    const allUsers = await Usuarios.find();
    const allProducts = await Codigos.find();
    let ventasModificadas = [];
    allVentas.map((c) => {
      let precioTotal = 0;
      let productosToSend = [];
      c.productos.map((p) => {
        let aux2;
        let descripAux = allProducts.find((e) => p.codigo == e.code);
        if (descripAux == undefined) {
          // hago esto para que no se rompa en caso de que no encuentre la descripción del producto
          descripAux = {
            description: "-",
          };
        }
        aux2 = {
          peso: p.peso,
          precio: p.precio,
          cantidad: p.cantidad,
          codigo: p.codigo,
          producto: descripAux.description,
        };
        precioTotal += p.precio;
        productosToSend.push(aux2);
      });
      let userAux = allUsers.find((e) => c.userId == e._id);
      if (userAux == undefined) {
        userAux = {
          apellido: "-",
          nombre: "-",
        };
      }
      let aux = {
        fechaHora: c.fechaHora,
        productos: productosToSend,
        user: {
          id: c.user,
          nombre: userAux.nombre,
          apellido: userAux.apellido,
        },
        precioTotal: precioTotal,
        id: c._id,
      };

      ventasModificadas.push(aux);
    });
    /* TO DO Faltaría hacer lo del stock */
    res.status(200).json(ventasModificadas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//UPDATE POR AHORA NO MODIFICO VENTAS
/* const updateCode = async (req, res) => {
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
}; */

//DELETE
const deleteVenta = async (req, res) => {
  try {
    const id = req.params.id;
    const productos = await Ventas.find();
    const producto = productos.find((e) => e._id == id);
    if (producto) {
      await Ventas.findOneAndDelete({ _id: id });
      res.status(200).json({ message: "Venta eliminada" });
    } else {
      res.status(404).json({ error: "Venta no encontrada" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Venta no encontrada" });
  }
};

module.exports = {
  getAllVentas,
  createVenta,
  deleteVenta,
};
