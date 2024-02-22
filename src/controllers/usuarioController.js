const Usuarios = require("../models/usuarios.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST
const register = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasenia } = req.body;
    const allUsers = await Usuarios.find();
    let usuarioRepetido = allUsers.find((e) => e.email == email);
    if (usuarioRepetido) {
      res.status(400).json({ message: "Email con cuenta existente" });
    } else {
      const hash = await bcrypt.hash(contrasenia, 10);
      const usuario = new Usuarios({
        nombre,
        apellido,
        email,
        contrasenia: hash,
        esActivo: true,
        esAdmin: 0,
      });
      await usuario.save();
      res.status(201).json({ message: "¡Usuario Creado!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await Usuarios.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(404).send("Usuario y/o contraseña incorrectos");
    }
    const match = await bcrypt.compare(req.body.contrasenia, user.contrasenia);
    console.log(match);
    if (!match) {
      return res.status(404).send("Usuario y/o contraseña incorrectos");
    }

    //Creacion del Token
    const token = jwt.sign(
      {
        id: user._id,
        rol: user.esAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1D" }
    );
    res.header("auth-token", token).json({
      message: "Usuario logueado con éxito",
      data: { token, nombre: user.nombre, rol: user.esAdmin },
    });
  } catch (error) {}
};

//GET
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Usuarios.find();
    let array = [];
    const filter = allUsers.map((f) => {
      let aux = {
        _id: f._id,
        nombre: f.nombre,
        apellido: f.apellido,
        email: f.email,
        esActivo: f.esActivo,
        esAdmin: f.esAdmin,
      };
      array = [...array, aux];
    });
    res.status(200).json(array);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const f = await Usuarios.findById(id);
    if (f) {
      let aux = {
        _id: f._id,
        nombre: f.nombre,
        apellido: f.apellido,
        email: f.email,
        esActivo: f.esActivo,
        esAdmin: f.esAdmin,
      };
      res.json(aux);
    } else {
      res.status(404).json({ error: "Usuario NO encontrada" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//PUT
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Usuarios.findById(id);
    if (user) {
      user.nombre = req.body.nombre || user.nombre;
      user.apellido = req.body.apellido || user.apellido;
      user.email = req.body.email || user.email;
      user.esActivo = req.body.esActivo || user.esActivo;
      user.esAdmin = req.body.esAdmin || user.esAdmin;
      await user.save();
      res.status(200).json({ message: "Usuario actualizado" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (req, res) => {
  //(recibe [oldPass,newPass])
  try {
    const id = req.params.id;
    const user = await Usuarios.findById(id);
    const isPasswordMatch = await bcrypt.compare(
      req.body.oldPass,
      user.contrasenia
    );
    if (!isPasswordMatch) {
      res.status(404).json({
        error: "Contrasenia antigua incorrecta",
      });
    } else {
      const hash = await bcrypt.hash(req.body.newPass, 10);
      if (user) {
        user.contrasenia = hash;
        await user.save();
        res.status(200).json({ message: "Contrasenia actualizada" });
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//DELETE
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Usuarios.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Usuario no encontrada" });
  }
};

module.exports = {
  register,
  getAllUsers,
  getUserById,
  updatePassword,
  updateUser,
  deleteUser,
  login,
};
