// creamos un servidor web con express
const express = require("express");

// nos traemos el puerto donde escucha el servidor --siempre en una constante y en mayusculas

const PORT = 8080;

// CREAMOS AHORA SI EL SERVIDOR

const app = express();

//! CREAMOS LAS ROUTAS DE LA APLICACION

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world");
});

router.get("/movie", (req, res) => {
  const movies = ["Dune", "Harry Potter", "Babie", "Matilda"];
  res.send(movies);
});

// vamos a usar el routing

app.use("/api/v1/", router);

// escuchamos el servidor

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
