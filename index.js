import express, { request, response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
const mongoose = require("mongoose");
const connectDb = require("./src/database/db.js");

console.log("Conectando...");

const app = express();

app.set("port", process.env.PORT || 5050);

app.use(express.json()); // permite recibir objeto en formato json
app.use(express.urlencoded({ extended: true })); // permite recibir parámetros en las rutas
app.use(morgan("dev")); // Brinda detalles en nuestra terminal
app.use(cors()); // permite recibir peticiones remotas

const initApp = async () => {
  try {
    await connectDb();
    app
      .listen(app.get("port"), () => {
        console.log(`Estoy escuchando localmente el puerto ${app.get("port")}`);
      })
      .on("error", (error) => {
        console.log("ERROR : ", error);
        process.exit(1);
      });
  } catch (error) {
    console.log("ERROR : ", error);
    process.exit(1);
  }
};

initApp();

app.use(
  "/api",
  require("./src/routes/Compras.routes.js"),
  require("./src/routes/Codigos.routes.js"),
  require("./src/routes/Usuario.routes.js"),
);
