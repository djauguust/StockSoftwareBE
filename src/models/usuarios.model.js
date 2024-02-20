const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuariosModel = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    user: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const UsuarioModel = mongoose.model("usuarios", usuariosModel); // crea la coleccion en la db

module.exports = UsuarioModel;
