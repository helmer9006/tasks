const Tarea = require("../Models/tarea");
const Proyecto = require("../Models/proyecto");
const { validationResult } = require("express-validator");
const router = require("../routes/usuarios");
const auth = require("../middelware/auth");

//crear una nueva tarea

exports.crearTarea = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;
    //validar si el proyecto existe
    const ValidaProyecto = await Proyecto.findById(proyecto);
    if (!ValidaProyecto) {
      return res.status(400).json({ msg: "Proyecto no encontrado" });
    }
    //revisar si el proyecto actual pertenece al usuario autenticado

    if (ValidaProyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }
    //crear tarea en la db
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//obtener tareas por proyecto

exports.obtenerTareas = async (req, res) => {
  try {
    //extraer el proyecto y comprobar si existe
    const { proyecto } = req.query;
    //validar si el proyecto existe

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //revisar si el proyecto actual pertenece al usaurio autenticado
    // if(ValidaProyecto.creador.toString() !== req.user._id){
    //   return res.status(401).json({msg: 'No Autorizado'});
    // }

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //obtener tareas por proyecto - id
    const tareas = await Tarea.find({ proyecto }).sort({ fecha_reg: -1 });
    res.status(200).json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Actualizar una tarea

exports.actualizarTarea = async (req, res) => {
  try {
    //extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    //validar si la tarea existe
    const validaTarea = await Tarea.findById(req.params.id);
    if (!validaTarea) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    // extraer proyecto
    const ValidaProyecto = await Proyecto.findById(proyecto);

    //revisar si el proyecto actual pertenece al usuario autenticado

    if (ValidaProyecto.creador.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //crear un objeto con la nueva informacion de tarea a modificar
    const nuevaTarea = {};
    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //guardar la tarea

    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id },
      nuevaTarea,
      { new: true }
    );
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Eliminar una tarea

exports.eliminarTarea = async (req, res) => {
  try {
    //extraer el proyecto y comprobar si existe
    const { proyecto } = req.query;

    //validar si la tarea existe
    const validaTarea = await Tarea.findById(req.params.id);
    if (!validaTarea) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    // extraer proyecto
    const ValidaProyecto = await Proyecto.findById(proyecto);

    //revisar si el proyecto actual pertenece al usuario autenticado

    // if (validaProyecto.creador.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "No Autorizado" });
    // }

    //eliminar la tarea

    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
