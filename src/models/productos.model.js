const mongoose = require("mongoose");
const { Schema } = mongoose;

const productosModel = new Schema(
  {
    codigo: {
      type: Number,
      required: true,
      min: 0,
      max: 9999999999,
    },
    descripcion: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
    },
    peso: {
      type: Number,
    },
    precio: {
      type: Number,
    },
  },
  { versionKey: false }
);

const ProductoModel = mongoose.model("stock", productosModel); // crea la coleccion en la db

module.exports = ProductoModel;
