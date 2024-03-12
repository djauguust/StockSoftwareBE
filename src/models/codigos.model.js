const mongoose = require("mongoose");
const { Schema } = mongoose;

const codigosModel = new Schema(
  {
    code: {
      type: Number,
      required: true,
      min: 0,
      max: 9999999999999,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const CodigoModel = mongoose.model("codigos", codigosModel); // crea la coleccion en la db

module.exports = CodigoModel;
