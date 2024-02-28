const mongoose = require("mongoose");
const { Schema } = mongoose;

const ventasModel = new Schema(
  {
    fechaHora: {
      type: String,
      required: true,
    },
    productos: [
      {
        codigo: {
          type: Number,
          min: 0,
          max: 9999999999,
        },
        cantidad: {
          type: Number,
          min: 0,
        },
        peso: {
          type: Number,
          min: 0,
        },
        precio: {
          type: Number,
        },
      },
    ],
    userId: {
      type: String,
    },
  },
  { versionKey: false }
);

const VentaModel = mongoose.model("ventas", ventasModel); // crea la coleccion en la db

module.exports = VentaModel;
