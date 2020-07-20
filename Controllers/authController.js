//importando modelo usuarios
const Usuario = require("../Models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticaUsuario = async (req, res) => {
  //revisar si hay errores

  // console.log(req.body)
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer el email y password

  const { email, password } = req.body;

  try {
    //revsiar que sea usuario registrado
    let usuario = await Usuario.findOne({ email });
    console.log(usuario);
    if (!usuario) {
      return res.status(400).json({ msg: "El usaurio no existe" });
    }
    //Revisar su password - el que vienen el req y el almacenado en la db
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }

    //si autenticacion es correcta
    
    // Crear y Firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    };

    //firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //tiempo de 1 hora para caducar el token
      },
      (error, token) => {
        if (error) throw error;
        //Mensaje de confirmacion
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//obtiene que usuario está autenticado
exports.usuarioAutenticado = async(req, res)=>{
  try {
    const usuario = await Usuario.findById(req.user.id).select('-password');
    res.json({usuario});
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Hubo un error'})
  }
}