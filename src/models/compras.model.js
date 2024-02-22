const mongoose = require("mongoose");
const { Schema } = mongoose;

const comprasModel = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    fechaHora: {
      type: String,
      require: true,
    },
    codigo: {
      type: Number,
      required: true,
      min: 0,
      max: 9999999999,
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
    user: {
      type: Number,
    },
  },
  { versionKey: false }
);

const CompraModel = mongoose.model("compras", comprasModel); // crea la coleccion en la db

module.exports = CompraModel;
