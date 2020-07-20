//Rutas para gestionar tareas
const express = require("express");
const router = express.Router();
const tareaController = require("../Controllers/tareaController");
const { check } = require("express-validator");
const auth = require("../middelware/auth");


///crear una tarea
//api/tareas
router.post('/', 
auth,
[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("proyecto", "El proyecto es obligatorio").not().isEmpty()
],
tareaController.crearTarea
);



//obtener tareas por proyecto 

router.get('/', 
auth,
tareaController.obtenerTareas
);

//actualizar tarea

router.put('/:id', 
auth,

[],
tareaController.actualizarTarea
);

//eliminar una tarea

router.delete('/:id', 
auth,

[],
tareaController.eliminarTarea
);






module.exports = router;

