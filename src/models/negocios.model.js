const mongoose = require("mongoose");
const { Schema } = mongoose;

const negociosModel = new Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        aumento: {
            type: Number,
            required: true,
        },
    },
    { versionKey: false }
);

const NegocioModel = mongoose.model("negocios", negociosModel); // crea la coleccion en la db

module.exports = NegocioModel;
