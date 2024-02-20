const mongoose = require("mongoose");
const { Schema } = mongoose;

const ventasModel = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    fechaHora: {
      type: Date,
      require: true,
    },
    productos: [
      {
        codigo: {
          type: Number,
          min: 0,
          max: 999999999,
        },
        cantidad: {
          type: Number,
          min: 1,
        },
      },
    ],
    precio: {
      type: Number,
    },
    user: {
      type: Number,
    },
  },
  { versionKey: false }
);

const VentaModel = mongoose.model("ventas", ventasModel); // crea la coleccion en la db

module.exports = VentaModel;
