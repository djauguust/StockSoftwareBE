const Codigos = require("../models/codigos.model");
const Productos = require("../models/productos.model");

//POST

const createProduct = async (req, res) => {
    try {
        const { codigo, cantidad, peso, precio } = req.body;
        const allProducts = await Productos.find();
        let usuarioRepetido = allProducts.find(
            (e) => e.codigo == codigo
        );
        if (usuarioRepetido) {
            res.status(400).json({ message: "Código existente" });
        } else {
            const codigoStock = new Productos({
                codigo, cantidad, peso, precio
            });
            await codigoStock.save();
            res.status(201).json({ message: "¡Producto Creado!" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//GET

const getAllProducts = async (req, res) => {
    try {
        const allCodes = await Codigos.find();
        const allProducts = await Productos.find();
        let toSend = []
        allProducts.map((p) => {
            let descripAux = allCodes.find((e) => p.codigo == e.code);
            if (descripAux == undefined) {
                descripAux = {
                    description: "-"
                }
            }
            let aux = {
                p,
                descripcion: descripAux.description
            }
            toSend.push(aux)
        })
        res.status(200).json(toSend);
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
const deleteCode = async (req, res) => {
    try {
        const code = req.params.code;
        const productos = await Codigos.find();
        const producto = productos.find((e) => e.code == code);
        if (producto) {
            await Codigos.findOneAndDelete({ code: code });
            res.status(200).json({ message: "Producto eliminado" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Producto no encontrado" });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
};
