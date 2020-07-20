const Proyecto = require('../Models/proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async(req, res)=>{

     //revisar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }
    try {
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardar creador con dato del JWT -TOKEN
        proyecto.creador = req.user.id;

        //Guardamos el proyecto en la base de datos
        proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un Error')
    }
}

//obtener todos los proyectos del usuario actual

exports.obtenerProyecto = async(req, res)=>{
    try {
        const proyectos = await Proyecto.find({creador: req.user.id}).sort({fecha_reg:-1});//obtener proyectos ordenado por fecha desc
        res.status(200).json({proyectos});
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un Error')
    }
}

//Actualizar un proyecto 

exports.actualizarProyecto = async(req, res)=>{
     //revisar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }

     //extraer la informacion del proyecto 
     const { nombre } = req.body;
     const nuevoProyecto = {};

     //validar si existe datos en nombre y asignar al nuevo objeto proeycto
     if(nombre){
         nuevoProyecto.nombre = nombre;
     }

    try {

        //revisar el ID

        let proyecto = await Proyecto.findById(req.params.id);
       
        //validar si el proyecto existe

        if(!proyecto) return res.status(404).json({msg:'Proyecto no encontrado'})

        //verificar el creador de proyecto porque un usuario solo puede modificar sus proyectos
        
        if(proyecto.creador.toString() !== req.user.id){
            return res.status(401).json({msg:'No tienes autorizacion para modificar el proyecto'})
        }
        //actualizar

        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set : nuevoProyecto}, {new: true});
        res.json({proyecto});

    } catch (error) {
        console.log(error)
        return res.status(500).send('Error en el servidor');
    }
}


//Elimina un proyecto por su id

exports.eliminarProyecto = async(req, res)=>{


   try {

       //revisar el ID

       let proyecto = await Proyecto.findById(req.params.id);
      
       //validar si el proyecto existe

       if(!proyecto) return res.status(404).json({msg:'Proyecto no encontrado'})

       //verificar el creador de proyecto porque un usuario solo puede modificar sus proyectos
       
       if(proyecto.creador.toString() !== req.user.id){
           return res.status(401).json({msg:'No tienes autorizacion para eliminar el proyecto'})
       }
       //eliminar el proyecto

       await Proyecto.findOneAndRemove({_id: req.params.id});
       res.json({msg: 'Proyecto eliminado correctamente'});

   } catch (error) {
       console.log(error)
       return res.status(500).send('Error en el servidor');
   }
}
