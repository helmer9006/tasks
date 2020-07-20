//Rutas para gestionar proyectos
const express = require("express");
const router = express.Router();
const proyectoController = require("../Controllers/proyectoController");
const { check } = require("express-validator");
const auth = require("../middelware/auth");

//api/proyectos
//crear proyecto
router.post(
  "/",
  auth,
  //validar datos express -validator
  [check("nombre", "El nombre el proyecto es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);

//traer proyectos creados por el usuario logeado
router.get("/", auth, proyectoController.obtenerProyecto);

//actualizar proyecto

router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre el proyecto es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);


//eliminar un proyecto

router.delete(
    "/:id",
    auth,
    proyectoController.eliminarProyecto
  );

module.exports = router;
