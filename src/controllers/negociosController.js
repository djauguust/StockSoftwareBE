const Negocios = require("../models/negocios.model");

//POST

const createNegocio = async (req, res) => {
    try {
        const { nombre, aumento } = req.body;
        const codigo = new Negocios({
            nombre,
            aumento,
        });
        await codigo.save();
        res.status(201).json({ message: "¡Negocio Creado!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//GET

const getNegocio = async (req, res) => {
    try {
        const allCodes = await Negocios.find();
        res.status(200).json(allCodes[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//UPDATE
const updateNegocio = async (req, res) => {
    try {
        const code = req.params.code;
        const productos = await Negocios.find();
        const producto = productos.find((e) => e._id == code);
        if (producto) {
            producto.nombre = req.body.nombre || producto.nombre;
            producto.aumento = req.body.aumento || producto.aumento;
            await producto.save();
            res.status(200).json({ message: "Negocio actualizado" });
        } else {
            res.status(404).json({ error: "Negocio no encontrado" });
        }
    } catch (error) {
        console.log(error);
    }
};

//DELETE
const deleteNegocio = async (req, res) => {
    try {
        const code = req.params.code;
        const productos = await Negocios.find();
        const producto = productos.find((e) => e.code == code);
        if (producto) {
            await Negocios.findOneAndDelete({ _id: code });
            res.status(200).json({ message: "Negocio eliminado" });
        } else {
            res.status(404).json({ error: "Negocio no encontrado" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Negocio no encontrado" });
    }
};

module.exports = {
    createNegocio,
    getNegocio,
    updateNegocio,
    deleteNegocio,
};
