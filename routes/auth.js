//Rutas para autenticas usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../Controllers/authController");
const auth = require("../middelware/auth");

//Iniciar Sesión
//api/auth
router.post('/',
  authController.autenticaUsuario);

  router.get('/',
  auth,
  authController.usuarioAutenticado);

module.exports = router;
